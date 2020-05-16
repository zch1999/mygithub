import Link from 'next/Link'
import { Button } from 'antd'

export default () => (
  <Link href="/a" title="AAA">
    <Button>index</Button>
  </Link>
)

// React.createElement('span', {}, 'Index')