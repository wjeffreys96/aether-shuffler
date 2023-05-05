import GetData from "./components/GetData"

export default async function Home() {

  const response = await GetData("b", "creature", 1);
  const data = response.data;
  let names = [];

  data.forEach(obj => {
    names.push(obj.name + " ");
  });

  return (
    <main className='w-full'>
      <div className='flex flex-col w-full h-full m-5'>
        <ul>{names.map((name) => (<li>{name}</li>))}</ul>
      </div>
    </main>
  )
}
