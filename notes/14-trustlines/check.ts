/**
 * @file    check.ts
 * @author  Morgan Bergen
 * @summary Manually checking addresses in trustline
 */

function main() {

    // List of trustline addresses
    const trustlineAddresses = [
    ];

    console.log(`this set contains ${trustlineAddresses.has(``)}`);
    // Convert the array to a set
    const trustlinesSet = new Set(trustlineAddresses);

    console.log(trustlinesSet);
}

main();

