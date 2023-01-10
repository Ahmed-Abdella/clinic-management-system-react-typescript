import pb from "../lib/pocketbase";

// const records = await pb.collection("patients").getFullList(200, {
//   sort: "-created",
// });

// console.log(typeof records, records);

const AllPatients = () => {
  return (
    <div>
      {/* {records.map((record) => {
        return <div key={record.id}>{record.age}</div>;
      })} */}
    </div>
  );
};

export default AllPatients;
