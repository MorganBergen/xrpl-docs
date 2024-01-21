/**
 * @file            amend.ts
 * @author          Morgan Bergen
 * @description     request from mainnet the current amendments enabled
 */

import { Client, LedgerEntry } from "xrpl";

interface feature_response {
    result: {
        features: {
            [amendmentId: string]: {
                enabled: boolean;
                name?: string;
                supported: boolean;
                vetoed: boolean | string;
            };
        };
    };
};

async function main() {

    const client = new Client('wss://s1.ripple.com/');
    await client.connect();

    try {
        
        const feature_response = await client.request({
            id: 'list_all_features',
            command: 'feature'
        });

        console.log(feature_response.result);

    } catch (error) {
        console.log(error);
    }


    client.disconnect();
    return(0);
}

main();
