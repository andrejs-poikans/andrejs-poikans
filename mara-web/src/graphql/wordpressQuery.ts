import 'dotenv/config';

interface gqlParams{
    query: string;
    variables?: object; 
}

export async function wpquery({query, variables = {}}:gqlParams) {
    const res = await fetch('https://maramckevitt.com/wp/graphql', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': 'Basic YW5kcmVqc3BvaWthbnM6MjM4OSBYZGFYIGk5S0ogcEgySCBuSlZiIGdKam0='
            'Authorization': process.env.GRAPHQL_AUTH || ''
        },
        body: JSON.stringify({
            query,
            variables
        })
    })
    
    if (!res.ok) {
        console.error(res);
        return {};
    }

    const { data } = await res.json();
    return data;
}