/**
 * @file    check.ts
 * @author  Morgan Bergen
 * @summary Manually checking addresses in trustline
 */

function main() {

    // List of trustline addresses
    const trustlineAddresses = [
        "rhEyPWdFFoAM58jgXPghbPuAaVMzvAK21K",
        "rAuSUyfhqkYC99K6c4eiGMc5zJhrYS983",
        "rUqzJuoP77oHBEf6jM8qvR4EZQHkiHZg65",
        "rJ1a56NmWQ7DhCL8fvtfSsumSdkt4t6Y6i",
        "rUbypLjDwGKyRXdYqL3NetEUuBEBHnoJtc",
        "rYsFGN65DbTQnCit5yZbhUoLgVEwHAFoc",
        "raTZrymPTpigsUtjaNEBWktiAssrXHoTa7",
        "rBqVuZpMuDNYcdsyUGvJfUu8hV3vyNXvrv",
        "rfXgCLQ1QSTktMJm31efY8ZUDJCyEYPynY",
        "rsg9FuDMChKv4GihTYh79iGHtHzVuoZMpW",
        "rEe7JnPaaxZB8MUfvi4VJRRLfyaHw2gfdV",
        "rHxQvtATzCa1VFPUFSu5t9Mv6mPgT8Kk3c",
        "rfNTzMpoCGtov9JDk27YacsqKWfEFL4F9o",
        "rvbiHqdRf29dZ3hJFqXaEivkgDSfgwZUN",
        "rJnoUhw8G1wzcviZKryjEddjpCRhhX2VKL"
    ];

    console.log(`this set contains ${trustlineAddresses.has(`r4E8kHK2V4JmhVDGyj1oNAPt8xE9RPavqs`)}`);
    // Convert the array to a set
    const trustlinesSet = new Set(trustlineAddresses);

    console.log(trustlinesSet);
}

main();

