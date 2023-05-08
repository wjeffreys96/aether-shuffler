import GetData from "./components/GetData"

export default async function Home() {
  const params = {colorId: "b", type:"creature", page:1};

  const response = await GetData(params);
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
