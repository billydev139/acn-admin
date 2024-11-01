"use client"

import { CONFIG } from 'src/config-global';

import CorrosionViewPage from 'src/sections/corrosion/view';

// ----------------------------------------------------------------------

// export const metadata = { title: `Corrosion | Dashboard - ${CONFIG.appName}` };

export default function Page({ params }) {
    console.log("naveed warraaicj")
    return (<>
        <CorrosionViewPage id={params.id} />
    </>)
}
