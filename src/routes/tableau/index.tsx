import { createFileRoute } from '@tanstack/react-router';

import { TableAuComponent } from './-components/TableAu';

export const Route = createFileRoute('/tableau/')({
  component: () => <TableAuComponent />,
});
