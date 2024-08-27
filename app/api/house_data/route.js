import { getHouseDataByUprn } from '@/lib/ESfunctions/indevisual';
import { NextResponse } from 'next/server';



export async function POST(request) {
    

    try {


        let { uprn } = await request.json();

      console.log(uprn);
        if (!uprn) {
            return NextResponse.json({ error: 'UPRN is required.' }, { status: 400 });
        }

        const response = await getHouseDataByUprn(uprn);

        if (response) {
            return NextResponse.json(response, { status: 200 });
        } else {
            return NextResponse.json({ error: 'Failed to fetch data from PropertyData API' }, { status: 500 });
        }

        // if (response.ok) {
        //     const data = await response.json();
        //     return NextResponse.json(data, { status: 200 });
        // } else {
        //     return NextResponse.json({ error: 'Failed to fetch data from PropertyData API' }, { status: 500 });
        // }





    }
    catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Error fetching data from PropertyData API' }, { status: 500 });
    }

}