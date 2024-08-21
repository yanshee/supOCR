export default function ErrorPage() 
{
  return (
     <div
        style={{
           width: "100%",
           height: "100%",
           display: "flex",
           justifyContent: "center",
           alignItems: "center",
           color: "red"
        }}
     >
        <h1>Error 404 : Resource not found</h1>
     </div>
  );
}