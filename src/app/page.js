import GetBulkData from "./components/GetBulkData";
import GetData from "./components/GetData";
import SelectMenu from "./components/UI/Inputs/SelectMenu";

export default async function Home() {
  GetBulkData();


  // const response = await GetData("b", "creature", 2);
  // const data = response.data;
  // let imageArray = [];
  // let normalURIs = [];

  // data.forEach((obj) => {
  //   imageArray.push(obj.image_uris);
  // });

  // imageArray = imageArray.flat();

  // console.log(imageArray);

  // for (let i = 0; i < imageArray.length; i++) {
  //   normalURIs.push(imageArray[i])
  // }



  return (
    <main className="w-full">
      <div className="flex content-center justify-center p-3">
        <SelectMenu />
      </div>
      <div className="flex flex-col w-full h-full m-5">
        <ul>
          {/* {names.map((name) => (
            <li>{name}</li>
          ))} */}
        </ul>
      </div>
    </main>
  );
}
