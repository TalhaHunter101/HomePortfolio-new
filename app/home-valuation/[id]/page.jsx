

const getHomeDetails = async (uprn_id) => {
    
   let data = await  fetch("http://localhost:3000/api/house_data", {
        method: "POST",
        body: JSON.stringify({ uprn: uprn_id }),
        headers: {
            "Content-Type": "application/json",
        },
    })

    let response = await data.json();

    console.log(response);
    return response;




    }


export default async function HomeEvaluation({params}) {

    let uprn_id = params.id;

    let homeDetails = await getHomeDetails(uprn_id);






    return(
        <div className="mt-36" id="printThis">
            <h1>Home Evaluation</h1>


{
    homeDetails.full_address
}



        </div>
    )





}

