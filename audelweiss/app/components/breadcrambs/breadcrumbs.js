"use client";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {v4 as uuidv4} from "uuid";
import Typography from "@mui/material/Typography";
import {ChevronRightIcon} from "lucide-react";
import Link from "next/link";

export const Breadcrumbs = () => {
    const router = usePathname();
    const segments = router.split("/");
    const lastSegment = segments[segments.length - 1];
    segments[0] = 'Accueil';

    // TODO: faire la liste des éléments des url et les relier à un mot qui sera affiché dans le breadCrumb (exemple : /shop -> Accueil > Boutique)
    return (
        <div>
            <div className="flex mx-auto">
                {segments.map((path, index) => {
                    return (
                        <div key={uuidv4()} className="flex items-center">
                            <Link className="flex " href={`/${segments.slice(1, index + 1).join("/")}`}>                                <Typography
                                    variant="caption3"
                                    component="span"
                                    className={clsx(
                                        path !== lastSegment ? "text-gray-100 underline" : "text-grey-900",
                                        "capitalize "
                                    )}
                                >
                                    {decodeURIComponent(path)}
                                </Typography>
                                <Typography>
                                    {path !== lastSegment && (
                                        <Typography
                                            variant="caption2"
                                            component="span"
                                            className="ml-2 text-gray-100 "
                                        >
                                            &nbsp; &gt; &nbsp;
                                        </Typography>
                                    )}
                                </Typography>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}