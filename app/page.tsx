import Table from '@/components/table';
import { getLaunches } from '@/actions'

export default async function Home() {
  const post = await getLaunches()

  return (
    <section className='flex w-full'>
      <Table data={post} />
    </section>
  );
}
