
import CardClient from './CardClient';
export default async function CardPage({ params }: { params: { id: string } }) {
  const { id } = await Promise.resolve(params);
  return (
    <>
      <CardClient id={id} />
    </>
  );
}
