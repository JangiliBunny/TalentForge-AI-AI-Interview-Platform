import { useParams } from "react-router-dom";

const ReportPage = () => {
  const { id } = useParams();

  console.log(id); // interview id

  return (
    <div>
      Report for Interview: {id}
    </div>
  );
};

export default ReportPage;