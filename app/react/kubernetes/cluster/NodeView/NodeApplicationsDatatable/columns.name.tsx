import { CellContext } from '@tanstack/react-table';

import { isExternalApplication } from '@/react/kubernetes/applications/utils';
import { useIsSystemNamespace } from '@/react/kubernetes/namespaces/queries/useIsSystemNamespace';
import { ExternalBadge } from '@/react/kubernetes/components/ExternalBadge';
import { SystemBadge } from '@/react/kubernetes/components/SystemBadge';

import { Link } from '@@/Link';

import { helper } from './columns.helper';
import { NodeApplication } from './types';

export const name = helper.accessor('Name', {
  header: 'Name',
  cell: Cell,
});

function Cell({
  row: { original: item },
}: CellContext<NodeApplication, string>) {
  const isSystem = useIsSystemNamespace(item.ResourcePool);
  return (
    <div className="flex items-center gap-2">
      <Link
        to="kubernetes.applications.application"
        params={{ name: item.Name, namespace: item.ResourcePool }}
      >
        {item.Name}
      </Link>

      {isSystem ? (
        <SystemBadge />
      ) : (
        isExternalApplication({ metadata: item.Metadata }) && <ExternalBadge />
      )}
    </div>
  );
}
