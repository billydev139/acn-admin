import { CONFIG } from 'src/config-global';

import { ResaleApplicationsListView } from 'src/sections/resale';
import ResaleViewPage from 'src/sections/resale/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Resale | Dashboard - ${CONFIG.appName}` };

export default function Page({ params }) {
    return <ResaleViewPage title="Resale Requests" id={params.id} />;
}
