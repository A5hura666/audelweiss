"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from 'next/image';

export default function ShopCard(props) {
    return (
        <div>
            <Link href={props.link}>
                <Image
                    src="../../../public/images/shop/bonnet.png"
                    alt="Bonnet du model Pompom Urban Yéti"
                    crossOrigin="true"
                />
            </Link>
            <div>
                <h2>{props.category}</h2>
                <h3>{props.model} {props.name !== undefined ? '|' + props.name : ''}</h3>
                <h3>{props.price}</h3>
            </div>
        </div>
    );
}