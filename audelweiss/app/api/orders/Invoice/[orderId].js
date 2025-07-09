import { NextApiRequest, NextApiResponse } from 'next';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import prisma from 'prisma'; // ton instance prisma, à adapter

export default async function handler(req, res) {
    const { orderId } = req.query;

    // Récupération de la commande via Prisma
    const order = await prisma.order.findUnique({
        where: { id: Number(orderId) },
        include: { items: true, user: true },
    });

    if (!order) {
        res.status(404).json({ message: 'Commande introuvable' });
        return;
    }

    // Création du PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    let y = height - 50;

    page.drawText(`Facture N°: ${order.id}`, { x: 50, y, size: 20, font });
    y -= 30;
    page.drawText(`Date: ${order.createdAt.toLocaleDateString()}`, { x: 50, y, size: 14, font });
    y -= 30;
    page.drawText(`Client: ${order.user.name || ''}`, { x: 50, y, size: 14, font });
    y -= 40;

    page.drawText('Produits :', { x: 50, y, size: 16, font });
    y -= 20;

    order.items.forEach((item) => {
        page.drawText(
            `${item.quantity} x ${item.productName} (${item.productPrice} €)`,
            { x: 60, y, size: 12, font }
        );
        y -= 20;
    });

    y -= 20;
    page.drawText(`Total : ${order.total.toFixed(2)} €`, { x: 50, y, size: 16, font, color: rgb(0, 0, 0.8) });

    // Encodage du PDF
    const pdfBytes = await pdfDoc.save();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=facture-${order.id}.pdf`);
    res.send(Buffer.from(pdfBytes));
}
