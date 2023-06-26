const Promise = require("bluebird");
const xrpl_lib = require("../xrpl_lib.js");
const list_deleted = require("./data_pilot_wallets_deleted.js").list_deleted;

const NETWORK = "mainnet";

var xrpl = new xrpl_lib(NETWORK);
var wallet_data, dcm_data;
var issuer_currency = "PSC";
var issuer_address = "rwekfW4MiS5yZjXASRBDzzPPWYKuHvKP7E";
var xrp_funding_address = "rNZzcjq4vgKxiTVWBJefMGqaE7Qera297i";
var delimiter = "\t"

load_data();
xrpl.init()
.then(function() {
    return xrpl.get_balances(xrp_funding_address);
})
.then(function(res) {
    console.log("XRP Funding Wallet Balance:");
    console.log("==================================================");
    console.log(`XRP: ${res.filter((x) => (x.currency == "xrp"))[0].balance/1000000}`);
    console.log("==================================================");

    wallet_data = wallet_data.concat(list_deleted.map((x) => ({"wallet_id":x})));
    return Promise.map(wallet_data, function(wd) {
// NOTE: example output of get_balances
// [
//   { balance: '19999988', currency: 'xrp' },
//   {
//     account: 'rwekfW4MiS5yZjXASRBDzzPPWYKuHvKP7E',
//     balance: '0',
//     currency: 'PSC',
//     limit: '10000',
//     limit_peer: '0',
//     no_ripple: false,
//     no_ripple_peer: false,
//     quality_in: 0,
//     quality_out: 0
//   }
// ]
        return xrpl.get_balances(wd.wallet_id).catch((e) => {
            if(typeof(e) == "string" && e.includes("not found on XRPL network")) return [{"balance":"0","currency":"xrp"}];
            else return Promise.reject(e);
        })
        .then((d) => ({"wallet": wd, "balances": d}));
    }, {"concurrency": 20});
})
.then(function(arr) {
    console.log("Nautilus Wallet Data:");
    console.log("==================================================");
    console.log(`address${delimiter} name${delimiter} phone number${delimiter}xrp${delimiter} psc trustline${delimiter} other trustline`);
    arr.forEach((res) => {
        console.log(`${res.wallet.wallet_id}${delimiter} ${res.wallet.owner_name}${delimiter} '${res.wallet.phone_number}${delimiter} ${res.balances.filter((x) => (x.currency == "xrp"))[0].balance}${delimiter} ${res.balances.filter((x) => (x.currency == issuer_currency && x.account == issuer_address)).length > 0 ? "Y" : "N"}${delimiter} ${res.balances.filter((x) => (x.currency != "xrp" && (x.currency != issuer_currency || x.account != issuer_address))).length > 0 ? "Y" : "N"}`);
    });
    console.log("==================================================");

    return xrpl.get_balances(issuer_address);
})
.then(function(bals) {
    var dcmbals = bals.filter((x) => (dcm_data[x.account] != null));
    console.log("");
    console.log("DCM Accounts:");
    console.log("==================================================");
    console.log(`account${delimiter}address${delimiter}currency${delimiter}balance${delimiter}limit`);
    dcmbals.forEach((bal) => {
        console.log(`${dcm_data[bal.account]}${delimiter}${bal.account}${delimiter} ${bal.currency}${delimiter} ${bal.balance}${delimiter} ${bal.limit_peer}`)
    })
    console.log("==================================================");
    
    var fbals = bals.filter((x) => (x.currency != "xrp" && wallet_data.filter((y) => (y.wallet_id == x.account)).length == 0) && dcm_data[x.account] == null);
    console.log("");
    console.log("Other PSC Trustlines:");
    console.log("==================================================");
    if(fbals.length == 0) console.log("No unknown trustlines");
    else console.log(`address${delimiter}currency${delimiter}balance${delimiter}limit`);
    fbals.forEach((bal) => {
        console.log(`${bal.account}${delimiter} ${bal.currency}${delimiter} ${bal.balance}${delimiter} ${bal.limit_peer}`)
    })
    console.log("==================================================");
})
.catch(function(err) {
    console.error("Error: "+err);
})
.finally(function() {
    xrpl.close();
});

function load_data() {
dcm_data = 
    {"rwekfW4MiS5yZjXASRBDzzPPWYKuHvKP7E": "PSC Issuer"
    , "rUqzJuoP77oHBEf6jM8qvR4EZQHkiHZg65": "PSC Standby"
    , "rAuSUyfhqkYC99K6c4eiGMc5zJhrYS983": "PSC Standby Redemption"
    , "raTZrymPTpigsUtjaNEBWktiAssrXHoTa7": "PSC Distribution"
    , "rBqVuZpMuDNYcdsyUGvJfUu8hV3vyNXvrv": "PSC Redemption"};


wallet_data =
[{
  "_id": {
    "$oid": "639340e6a63a8b992f6f8174"
  },
  "wallet_id": "r3xUVoiRsww3SpPhkYaPfhNZ52K8KP5rEc",
  "owner_name": "Nautilus Wallet",
  "phone_number": "+27785555555"
},{
  "_id": {
    "$oid": "63fc4cbb240d49acba9dcec2"
  },
  "wallet_id": "rBYDuzyW2vhPmmXLvaKuWPZp3FfYavvYm2",
  "owner_name": "Kaleb Udui",
  "phone_number": "+6807755263"
},{
  "_id": {
    "$oid": "63fd5ae5240d49acba9dceda"
  },
  "wallet_id": "rN8EyzRh6p9SibdmUoWqizeYnDEu7YmbDm",
  "owner_name": "Jay Anson",
  "phone_number": "+1502-802-5979"
},{
  "_id": {
    "$oid": "63fd6c97240d49acba9dcedc"
  },
  "wallet_id": "r9HPXXJFRyWyM6de4R2iKmedPbwGKVsjPD",
  "owner_name": "Steven Redhor",
  "phone_number": "+6807756039"
},{
  "_id": {
    "$oid": "63fd7e3d240d49acba9dcede"
  },
  "wallet_id": "rwvEUEKQAARZ4gYHqY2mjUYw7ePTDLtsiX",
  "owner_name": "Jude Masters",
  "phone_number": "+6807796658"
},{
  "_id": {
    "$oid": "63fdb3df240d49acba9dcee8"
  },
  "wallet_id": "rPiA9K17gAt3GTtbXKTDFxDBaaCRDbfrQh",
  "owner_name": "Sherry Ann Tadao",
  "phone_number": "+6807756100"
},{
  "_id": {
    "$oid": "63fe767a240d49acba9dcefc"
  },
  "wallet_id": "r4niYxH2Ks3KBwcDCcygLex4jQLDnJYeku",
  "owner_name": "Elway Ikeda",
  "phone_number": "+6807752426"
},{
  "_id": {
    "$oid": "63fea838240d49acba9dcf0e"
  },
  "wallet_id": "rMuE6CPqUfywXvdncxg5NPmxs7P2FmhSN5",
  "owner_name": "Susan Malsol",
  "phone_number": "+6807751986"
},{
  "_id": {
    "$oid": "63feac03240d49acba9dcf1a"
  },
  "wallet_id": "rsEZdpQo8Zug5NzkBDXvNitMKa7Wvss1Mc",
  "owner_name": "DISON SBAL",
  "phone_number": "+6807757798"
},{
  "_id": {
    "$oid": "63feb2d0240d49acba9dcf2a"
  },
  "wallet_id": "rfyhSj6iPpSZtpFWtegkjfRZ2JSRPqbvPM",
  "owner_name": "Levi Idechong",
  "phone_number": "+6807785384"
},{
  "_id": {
    "$oid": "63feb373240d49acba9dcf2c"
  },
  "wallet_id": "rNpgWoUzpxPm9QNx8tHTQEeQiPPUscdgm3",
  "owner_name": "Pualani Arbedul",
  "phone_number": "+6807758484"
},{
  "_id": {
    "$oid": "63feb7c5240d49acba9dcf51"
  },
  "wallet_id": "rvbiHqdRf29dZ3hJFqXaEivkgDSfgwZUN",
  "owner_name": "Valerie M Ikesakes",
  "phone_number": "+6807756393"
},{
  "_id": {
    "$oid": "63fec31f240d49acba9dcf62"
  },
  "wallet_id": "rqDVJc44ngE2cjGDozaJQKMPnDk1sfFRS",
  "owner_name": "McKinley Emesiochel",
  "phone_number": "+6807754355"
},{
  "_id": {
    "$oid": "63fec3dc240d49acba9dcf64"
  },
  "wallet_id": "rNKMqgo2yK4oXbAMDozXSNBwQGtwB1xjX9",
  "owner_name": "Jenevy  Akitaya",
  "phone_number": "+6807796924"
},{
  "_id": {
    "$oid": "63fec9bf240d49acba9dcf70"
  },
  "wallet_id": "raLdK6VitvpoPcHjAoxg1JgtqzCt5EymK9",
  "owner_name": "Robert Tarkong",
  "phone_number": "+6807768050"
},{
  "_id": {
    "$oid": "640035bc240d49acba9dcfad"
  },
  "wallet_id": "rpeNGhFuVrhCeQ3Rr9j1SAw1yTJ9WfkdPk",
  "owner_name": "OLIVIA KELULAU",
  "phone_number": "+6807787911"
},{
  "_id": {
    "$oid": "64003675240d49acba9dcfaf"
  },
  "wallet_id": "rUiLh6sGy3fjSQoJfwspxENeUygQb7LMhy",
  "owner_name": "Loureine Echang",
  "phone_number": "+6807757747"
},{
  "_id": {
    "$oid": "64012fdb240d49acba9dcfbf"
  },
  "wallet_id": "r4fP9Cn8EGyqLw5Hi5TLjrYP47N1ym5hzh",
  "owner_name": "Juanita Kloulubak",
  "phone_number": "+6807793296"
},{
  "_id": {
    "$oid": "64013712240d49acba9dcfc1"
  },
  "wallet_id": "r9cvbDoKR75sBgvCSq6P8JSbEsktsopt7i",
  "owner_name": "Kaleb Udui",
  "phone_number": "+6807755263"
},{
  "_id": {
    "$oid": "64019f7a240d49acba9dcfc7"
  },
  "wallet_id": "rJ1a56NmWQ7DhCL8fvtfSsumSdkt4t6Y6i",
  "owner_name": "Maryjane Laamar",
  "phone_number": "+6807752033"
},{
  "_id": {
    "$oid": "64053871240d49acba9dcfcb"
  },
  "wallet_id": "rP1AP28sq6cxgSssxHzfVBzMZoghusW4TG",
  "owner_name": "Chasinta  Jefferson",
  "phone_number": "+6807752795"
},{
  "_id": {
    "$oid": "64053a02240d49acba9dcfd0"
  },
  "wallet_id": "rpeEsFrHaBdRHfrdi7zUUWCiotgJDWZ1XF",
  "owner_name": "Chasinta  Jefferson",
  "phone_number": "+6807752795"
},{
  "_id": {
    "$oid": "64056198240d49acba9dcfd8"
  },
  "wallet_id": "rHUmm4yoZhcph5HPPjJMhCTcUsxTHc6FFw",
  "owner_name": "Darren Fritz",
  "phone_number": "+6807752070"
},{
  "_id": {
    "$oid": "6405852c240d49acba9dcfe0"
  },
  "wallet_id": "rfcBbibeE7qW7jNBqUsdyciPypgAgVkPu5",
  "owner_name": "Sorcha Basilius",
  "phone_number": "+6807798892"
},{
  "_id": {
    "$oid": "640591e5240d49acba9dcfe6"
  },
  "wallet_id": "rhRA3hPZRL7Jv7xAaugw3xdCrgy4vBSApC",
  "owner_name": "Lloyd Ueda",
  "phone_number": "+6807755665"
},{
  "_id": {
    "$oid": "64059abc240d49acba9dcfe8"
  },
  "wallet_id": "rN1Ct5b7uD96spjbwXpKtPYtKSfwPdfvEi",
  "owner_name": "Rois Nakamura",
  "phone_number": "+6807791568"
},{
  "_id": {
    "$oid": "6405cc67240d49acba9dcffe"
  },
  "wallet_id": "rhEyPWdFFoAM58jgXPghbPuAaVMzvAK21K",
  "owner_name": "Lynette Franz",
  "phone_number": "+6807761377"
},{
  "_id": {
    "$oid": "64069b2e240d49acba9dd018"
  },
  "wallet_id": "rh2uRAAqPw5GboMAMjvFZRnEto5adDNpaL",
  "owner_name": "Zhantell Rechirikl",
  "phone_number": "+6807795672"
},{
  "_id": {
    "$oid": "6406a0f6240d49acba9dd024"
  },
  "wallet_id": "rKfAtnD6sQrBhTrbFccJH9Y9hBJa5MCSb8",
  "owner_name": "Lolyna Ngiratrang",
  "phone_number": "+6807751694"
},{
  "_id": {
    "$oid": "6406afcc240d49acba9dd030"
  },
  "wallet_id": "rE3rwL3ApeDVSUkvjTJ5kuDcpEznvkZ3HM",
  "owner_name": "Aidan Benhart",
  "phone_number": "+6807755358"
},{
  "_id": {
    "$oid": "6406b205240d49acba9dd032"
  },
  "wallet_id": "rNCW52zvtGMzDw7k8Gxptn2zeosG95gd37",
  "owner_name": "Yolanda Kloulubak ",
  "phone_number": "+6807758071"
},{
  "_id": {
    "$oid": "6406c6f0240d49acba9dd038"
  },
  "wallet_id": "rG4JSSZLxFj8yfumJLJYLJ4X9rWrM1WSws",
  "owner_name": "Endira Apsalom",
  "phone_number": "+6807751624"
},{
  "_id": {
    "$oid": "6406c788240d49acba9dd03a"
  },
  "wallet_id": "rnnufYqyB3oHSNX6gVdNCEYYVjLvGSJnR9",
  "owner_name": "Ray Marino",
  "phone_number": "+6807752909"
},{
  "_id": {
    "$oid": "6406c7cd240d49acba9dd03c"
  },
  "wallet_id": "r4wSwwNaSFMDWHkpCeBkDirE2jxyJkXfeJ",
  "owner_name": "Melson Miko",
  "phone_number": "+6807752977"
},{
  "_id": {
    "$oid": "6406cdab240d49acba9dd044"
  },
  "wallet_id": "rsorcWDEaJrd8hwfjWuZgvmnhiG4uw9t88",
  "owner_name": "weston Ketebengang",
  "phone_number": "+6807794912"
},{
  "_id": {
    "$oid": "6406d971240d49acba9dd050"
  },
  "wallet_id": "rw4RXAQqCd5tb6rvuMCepwgopaRJZnCgcG",
  "owner_name": "Tuloy Rengiil",
  "phone_number": "+6807791859"
},{
  "_id": {
    "$oid": "6406e103240d49acba9dd052"
  },
  "wallet_id": "rLq94GGmP6C7Nzz5hT57diPhkKJR3j7eWj",
  "owner_name": "Kiblas Soaladaob",
  "phone_number": "+6807756126"
},{
  "_id": {
    "$oid": "6406e562240d49acba9dd056"
  },
  "wallet_id": "rYsFGN65DbTQnCit5yZbhUoLgVEwHAFoc",
  "owner_name": "Marlene Theodore-Ge",
  "phone_number": "+6807751328"
},{
  "_id": {
    "$oid": "6406fd03240d49acba9dd05a"
  },
  "wallet_id": "rUbypLjDwGKyRXdYqL3NetEUuBEBHnoJtc",
  "owner_name": "Rodney Omelau",
  "phone_number": "+6807755659"
},{
  "_id": {
    "$oid": "640707fb240d49acba9dd05c"
  },
  "wallet_id": "r3dcooQdWWCUQAM6rghyXwmSp1RfXH7EQw",
  "owner_name": "Vera Melimarang",
  "phone_number": "+6807786443"
},{
  "_id": {
    "$oid": "6407ca87240d49acba9dd05e"
  },
  "wallet_id": "rEQFRfxX81HPsYQ3c5fSNgkLaiW3g3YQj9",
  "owner_name": "wayland keizi",
  "phone_number": "+6807755299"
},{
  "_id": {
    "$oid": "6407cd9c240d49acba9dd062"
  },
  "wallet_id": "rJnoUhw8G1wzcviZKryjEddjpCRhhX2VKL",
  "owner_name": "waylamd  keizi",
  "phone_number": "+6807755299"
},{
  "_id": {
    "$oid": "6407ce46240d49acba9dd064"
  },
  "wallet_id": "rK9M3oZFuDnCUmRbLMt3mmEjXkjB5yAcKd",
  "owner_name": "Marianne Lomongo",
  "phone_number": "+6807752237"
},{
  "_id": {
    "$oid": "6407d7d4240d49acba9dd06f"
  },
  "wallet_id": "rQBiMQFQZm371ghrPaRqX6kf89K8SDxh7R",
  "owner_name": "HARDEN HASINTO",
  "phone_number": "+6807758426"
},{
  "_id": {
    "$oid": "6407d943240d49acba9dd073"
  },
  "wallet_id": "rEe7JnPaaxZB8MUfvi4VJRRLfyaHw2gfdV",
  "owner_name": "Phea Emesiochl",
  "phone_number": "+6807757432"
},{
  "_id": {
    "$oid": "6407e0fe240d49acba9dd079"
  },
  "wallet_id": "rftqDt9w1pjX1dexSG3z4WLacMXE98hoVb",
  "owner_name": "Haque Blesam",
  "phone_number": "+6807752890"
},{
  "_id": {
    "$oid": "6407e173240d49acba9dd07b"
  },
  "wallet_id": "rHELTF9xXATbGDiSSfqTabNcrkwLJSQ4p6",
  "owner_name": "Lulu Techur",
  "phone_number": "+6807751379"
},{
  "_id": {
    "$oid": "6408033a240d49acba9dd085"
  },
  "wallet_id": "rnebweDSjd1U9K1PGWvE9wSaaFdiQttb7f",
  "owner_name": "ASHLEY ADELBAI",
  "phone_number": "+6807795433"
},{
  "_id": {
    "$oid": "64080565240d49acba9dd093"
  },
  "wallet_id": "rpLztFaud5Kbm7BkC77NSeUEqHr2n68977",
  "owner_name": "RUTH ANDERSON",
  "phone_number": "+6807758906"
},{
  "_id": {
    "$oid": "640808e7240d49acba9dd09c"
  },
  "wallet_id": "rPHTDw2x8zJpnxQMjEBe2k4fK7QV7wQAYZ",
  "owner_name": "younger sakuma",
  "phone_number": "+6807791234"
},{
  "_id": {
    "$oid": "64081ee0240d49acba9dd0b1"
  },
  "wallet_id": "rfXgCLQ1QSTktMJm31efY8ZUDJCyEYPynY",
  "owner_name": "miriam rengulbai",
  "phone_number": "+6807753487"
},{
  "_id": {
    "$oid": "640821bf240d49acba9dd0b3"
  },
  "wallet_id": "rMjx7PKhoSzmWNqsYAECZnaj689yN9p2QU",
  "owner_name": "Jerene Ngiraikelau",
  "phone_number": "+6807797211"
},{
  "_id": {
    "$oid": "640824b2240d49acba9dd0b5"
  },
  "wallet_id": "rDPF4HjcwVh2Ux7i16HQjHrhbcXWu2WfuK",
  "owner_name": "Dylan Reddin",
  "phone_number": "+6807788139"
},{
  "_id": {
    "$oid": "6408292a240d49acba9dd0b9"
  },
  "wallet_id": "rfXqGq8hLtLCJGFA53vzgWDUMDtJ1cWmL9",
  "owner_name": "Mace Ngiraungil",
  "phone_number": "+6807704314"
},{
  "_id": {
    "$oid": "64082934240d49acba9dd0bb"
  },
  "wallet_id": "rKWEvcSy4TnzCjj2dR3AFpmEFrbV5WRyfL",
  "owner_name": "odear yobech",
  "phone_number": "+6807753389"
},{
  "_id": {
    "$oid": "6408293b240d49acba9dd0bd"
  },
  "wallet_id": "rsp1BRzy5C4jGZSk7ucZucnsoGQhiM1nB7",
  "owner_name": "Masato Ushibata",
  "phone_number": "+6807757676"
},{
  "_id": {
    "$oid": "6408293c240d49acba9dd0bf"
  },
  "wallet_id": "rpwJoC15HJHfsZegimakyEMKXExNscZuws",
  "owner_name": "herman rdechor",
  "phone_number": "+6807758274"
},{
  "_id": {
    "$oid": "64082953240d49acba9dd0c1"
  },
  "wallet_id": "rBLxQv1UcJHT6zqrMYGqLwK6bRUhq6yW2",
  "owner_name": "HARRISON Tell",
  "phone_number": "+6807751027"
},{
  "_id": {
    "$oid": "6408298d240d49acba9dd0c3"
  },
  "wallet_id": "rEVjm9sqrTn8yALfcvUpjQ48kurihEpVfg",
  "owner_name": "Chasinta Jefferson",
  "phone_number": "+6807752795"
},{
  "_id": {
    "$oid": "640829dc240d49acba9dd0c7"
  },
  "wallet_id": "r9tU3Uvd9ez9ivd8qCnnSk1NW7D9WqoFUP",
  "owner_name": "RAYMOND AUGUST",
  "phone_number": "+6807754046"
},{
  "_id": {
    "$oid": "640833ce240d49acba9dd0d6"
  },
  "wallet_id": "rKHTzDPmhNzhh6sDBCMG7GeSW511hdB5zo",
  "owner_name": "Scott Weers",
  "phone_number": "+6807792602"
},{
  "_id": {
    "$oid": "640833d3240d49acba9dd0d9"
  },
  "wallet_id": "rfNTzMpoCGtov9JDk27YacsqKWfEFL4F9o",
  "owner_name": "Pualani Arbedul",
  "phone_number": "+6807758484"
},{
  "_id": {
    "$oid": "64083525240d49acba9dd0dc"
  },
  "wallet_id": "r47NwGDTQC6DYpn5SNMNpUj2ngj9uUJCMq",
  "owner_name": "Paige Tutii",
  "phone_number": "+6807753470"
},{
  "_id": {
    "$oid": "640835c7240d49acba9dd0e4"
  },
  "wallet_id": "rHcc28ZyLXwb8hBk6HGVMEDmxSJF7E81sK",
  "owner_name": "Duane Robert",
  "phone_number": "+6807753980"
},{
  "_id": {
    "$oid": "64083751240d49acba9dd0e8"
  },
  "wallet_id": "rLEw3hQNKk77evhX4ScZeDP1iiZQPPQx3b",
  "owner_name": "Whitney Kyota",
  "phone_number": "+6807755458"
},{
  "_id": {
    "$oid": "6408377c240d49acba9dd0ea"
  },
  "wallet_id": "r9jTacJuJ8cWcGdeLSKCwDLD7eYg8xfrQQ",
  "owner_name": "Kyonori Tellames",
  "phone_number": "+6807751280"
},{
  "_id": {
    "$oid": "64087209240d49acba9dd0f1"
  },
  "wallet_id": "rwe2FKrWXbKXsRMDfKNre5XHpXNZkw8HSU",
  "owner_name": "Nihla Reddin",
  "phone_number": "+6807789144"
},{
  "_id": {
    "$oid": "6409190b240d49acba9dd0f7"
  },
  "wallet_id": "rah3bk9NVWs2Lef6cLe8qQ4vkbLGqEtGde",
  "owner_name": "Etison  Sadang Jr ",
  "phone_number": "+6807756031"
},{
  "_id": {
    "$oid": "6409a48a240d49acba9dd0fa"
  },
  "wallet_id": "rbcZHnp6fG9QhxT9MtTTbJQwo4HDL48n4",
  "owner_name": "Leolin Tellei",
  "phone_number": "+6807785005"
},{
  "_id": {
    "$oid": "6409df63240d49acba9dd0fe"
  },
  "wallet_id": "r3zzWMvKHvgdKoFkqvHYsevqt5smDmgYHW",
  "owner_name": "Elchesel Wilfred",
  "phone_number": "+6807754445"
},{
  "_id": {
    "$oid": "640a9ece240d49acba9dd100"
  },
  "wallet_id": "rDdLhqq872ywmW1Kkb8ZjtVe5Njo4WVqCE",
  "owner_name": "Gerda Setts",
  "phone_number": "+6807787007"
},{
  "_id": {
    "$oid": "640ac8e1240d49acba9dd104"
  },
  "wallet_id": "rE6vFh6qtZSHFa57hCxeEkLdTxhdpXUcvx",
  "owner_name": "Kara Remeliik",
  "phone_number": "+6807753921"
},{
  "_id": {
    "$oid": "640b5daf240d49acba9dd108"
  },
  "wallet_id": "rK8oRFfyJT7zs1nPdPeNbcuU5LFxa6kgf8",
  "owner_name": "whitni Joseph",
  "phone_number": "+6807756018"
},{
  "_id": {
    "$oid": "640d6d83240d49acba9dd118"
  },
  "wallet_id": "rEGR42njgZjx4LdhqnELGoHwJarvNzxrB",
  "owner_name": "Vanessa Mobel",
  "phone_number": "+6807787319"
},{
  "_id": {
    "$oid": "640e796e240d49acba9dd121"
  },
  "wallet_id": "rN1BnEbEMwJtEdytFhygUxLiPGFHTATSk8",
  "owner_name": "keri demei",
  "phone_number": "+6807755793"
},{
  "_id": {
    "$oid": "640e79ff240d49acba9dd125"
  },
  "wallet_id": "rsg9FuDMChKv4GihTYh79iGHtHzVuoZMpW",
  "owner_name": "keri demei",
  "phone_number": "+6807755793"
},{
  "_id": {
    "$oid": "640e7be2240d49acba9dd129"
  },
  "wallet_id": "rUgvcTYZmNXqJUYU7n6xePdUHMxwtkFFXw",
  "owner_name": "Tikei Sbal",
  "phone_number": "+6807757447"
},{
  "_id": {
    "$oid": "640e805b240d49acba9dd12e"
  },
  "wallet_id": "rBGuTYuzR2upfMqzj5MpjJV75MPwtGnxYz",
  "owner_name": "olivia kelulau",
  "phone_number": "+6807787911"
},{
  "_id": {
    "$oid": "640e8079240d49acba9dd132"
  },
  "wallet_id": "rG6SpCnie9LBh4YHfZB8S8w2ESnEzJDrCx",
  "owner_name": "Jake  Ramon ",
  "phone_number": "+6807755153"
},{
  "_id": {
    "$oid": "640e80df240d49acba9dd134"
  },
  "wallet_id": "rNkZS2xmspcsgA3hNvA2VUEWGXuuSo5kzv",
  "owner_name": "realynn tucheliaur",
  "phone_number": "+6807755726"
},{
  "_id": {
    "$oid": "640e8170240d49acba9dd136"
  },
  "wallet_id": "rnBnPLeRqGApLY1sAYkpfhMMob9nZ9La12",
  "owner_name": "jordan ewatel",
  "phone_number": "+6807792857"
},{
  "_id": {
    "$oid": "640e8233240d49acba9dd138"
  },
  "wallet_id": "rLGPkWZQ3FnGUgExJGZwUdvHbJt34LT7kN",
  "owner_name": "Constance Keremius",
  "phone_number": "+6807762122"
},{
  "_id": {
    "$oid": "640e8401240d49acba9dd13a"
  },
  "wallet_id": "rEm9LA7MGYJapdoxSd3K5JEdQaqdmJc7FS",
  "owner_name": "Flavin Misech",
  "phone_number": "+6807751323"
},{
  "_id": {
    "$oid": "640e8c06240d49acba9dd13c"
  },
  "wallet_id": "rpuC6uUPBecnhFNqbrL4SFR6aLyY7sbZFz",
  "owner_name": "Williander  Ngotel ",
  "phone_number": "+6807756803"
},{
  "_id": {
    "$oid": "640e8cc2240d49acba9dd140"
  },
  "wallet_id": "rnqe1HnYW3bZPvQBU1vYJACU3W2sVWydGb",
  "owner_name": "Odelaffi Sato",
  "phone_number": "+6807794800"
},{
  "_id": {
    "$oid": "640e8dcd240d49acba9dd142"
  },
  "wallet_id": "rhqMxdkmPbDeiQZeEFxLrA7tDY93rgBae2",
  "owner_name": "Valeria Ngirameketii",
  "phone_number": "+6807756826"
},{
  "_id": {
    "$oid": "640e91d9240d49acba9dd146"
  },
  "wallet_id": "rECWEUMPpocufs1TEmTbWEbrcqkdoCj5bg",
  "owner_name": "Joline Spesungel",
  "phone_number": "+6807751751"
},{
  "_id": {
    "$oid": "640e94a1240d49acba9dd14a"
  },
  "wallet_id": "rEJF7AAfhAfLgjpnqaiWdg5yvVm2XVTNx3",
  "owner_name": "Mayer Julius",
  "phone_number": "+6807754465"
},{
  "_id": {
    "$oid": "640e9516240d49acba9dd14c"
  },
  "wallet_id": "rnSftEixsM7djhwwRxeqc9RqaYwLfxh2z6",
  "owner_name": "Clint Mersai",
  "phone_number": "+6807752142"
},{
  "_id": {
    "$oid": "640e95ae240d49acba9dd150"
  },
  "wallet_id": "rfyWR78L66GQTYbaWyLAi6JpQzjVRPqd9R",
  "owner_name": "Lorena Watanabe",
  "phone_number": "+6807798076"
},{
  "_id": {
    "$oid": "640e970c240d49acba9dd159"
  },
  "wallet_id": "rJg8ThBWMCc7QVuaDSZUWc36USTpMsu3eM",
  "owner_name": "Jake Meltel",
  "phone_number": "+6807750323"
},{
  "_id": {
    "$oid": "640e982a240d49acba9dd15b"
  },
  "wallet_id": "r4tPo9NkMCZGTqAVhJVLzjwLgBhQ8aZ3L7",
  "owner_name": "Maylene Gorong",
  "phone_number": "+6807754931"
},{
  "_id": {
    "$oid": "640ea1b3240d49acba9dd15f"
  },
  "wallet_id": "rn3TfmJSEP2WRgnrBFw425z4ZqCphRDoXS",
  "owner_name": "Elenoa Raitamata",
  "phone_number": "+6807709464"
},{
  "_id": {
    "$oid": "640eaeab240d49acba9dd161"
  },
  "wallet_id": "ra8qipzW1QQbDD8garNcd6DY3fVrYkaYn3",
  "owner_name": "Lamar Inacio",
  "phone_number": "+6807756051"
},{
  "_id": {
    "$oid": "640ef72d240d49acba9dd16b"
  },
  "wallet_id": "rHinnXBZArHgiGU5yPxKCZwyipombuMZ1F",
  "owner_name": "Silverius  Tellei ",
  "phone_number": "+6807756825"
},{
  "_id": {
    "$oid": "640fb8ec240d49acba9dd16f"
  },
  "wallet_id": "rMsWx7CjrYVQLUNR2jjRijyraULQqTt9gd",
  "owner_name": "Suzette Ngirasob",
  "phone_number": "+6807751149"
},{
  "_id": {
    "$oid": "640fb8f0240d49acba9dd171"
  },
  "wallet_id": "r4XdaLwxjDEeHLZRw7XSNwGHUSsUq9TRkX",
  "owner_name": "Georgialynn malsol",
  "phone_number": "+6807757425"
},{
  "_id": {
    "$oid": "640fb8ff240d49acba9dd173"
  },
  "wallet_id": "rNc9Pve1mfLZUp7n8bjC5QW9BXXkEDjSqS",
  "owner_name": "Bunker Ruluked",
  "phone_number": "+6807755207"
},{
  "_id": {
    "$oid": "640fb912240d49acba9dd175"
  },
  "wallet_id": "rHG17yvnMdB16ktZqnPL3QeQr44vVukqT6",
  "owner_name": "Nadene oiterong",
  "phone_number": "+6807751814"
},{
  "_id": {
    "$oid": "640fb923240d49acba9dd177"
  },
  "wallet_id": "rBE6UBASVA6JWsf3kCbkdEMnJ4Niq5cQ14",
  "owner_name": "Jalavenda Osima",
  "phone_number": "+6807758220"
},{
  "_id": {
    "$oid": "640fbade240d49acba9dd179"
  },
  "wallet_id": "rRCG8dL5VbrQpT9xxGdUXDHcwn9JM4Y2K",
  "owner_name": "Sunshine Soalablai",
  "phone_number": "+6807758503"
},{
  "_id": {
    "$oid": "640fcead240d49acba9dd17b"
  },
  "wallet_id": "rwA4cvSbqivKLeGA9FR9FfcjeEC5sRCJDD",
  "owner_name": "Judith Brodnansky",
  "phone_number": "+6807755312"
},{
  "_id": {
    "$oid": "640fcebf240d49acba9dd17d"
  },
  "wallet_id": "rnif9Vjg8nfrxwzxjyVbzoQaKj1SByvFML",
  "owner_name": "Alexandra Iyar",
  "phone_number": "+6807755415"
},{
  "_id": {
    "$oid": "640fcec3240d49acba9dd17f"
  },
  "wallet_id": "rDqaJ87P9K3BwhJoGxbby9qGAEyS9yKTh4",
  "owner_name": "Arielle Rengulbai",
  "phone_number": "+6807752879"
},{
  "_id": {
    "$oid": "640fcf3d240d49acba9dd181"
  },
  "wallet_id": "rET6NH1hEh3snFQp9gV3nPyCEipVipKEoM",
  "owner_name": "Tabesul Ngirailemesang",
  "phone_number": "+6807758048"
},{
  "_id": {
    "$oid": "640fcf90240d49acba9dd185"
  },
  "wallet_id": "rKFqFjQkDeMFbXXfjf27x1jtAMA8W5JJPA",
  "owner_name": "MELISSA MONGAMI",
  "phone_number": "+6807753085"
},{
  "_id": {
    "$oid": "640fd01e240d49acba9dd187"
  },
  "wallet_id": "rsqEMvhxd98HUBBs8tqrmykpF5oALXNhUc",
  "owner_name": "Jade Marino",
  "phone_number": "+6807755279"
},{
  "_id": {
    "$oid": "640fd077240d49acba9dd18d"
  },
  "wallet_id": "rB9wXRXeCMvzg3XPVvop4UevkHnu4s1Mow",
  "owner_name": "Ethan Techitong",
  "phone_number": "+6807752470"
},{
  "_id": {
    "$oid": "640fd1ed240d49acba9dd195"
  },
  "wallet_id": "rpVC6e2FfGxfHNUBrSTtK4cSxZGsXPp8g4",
  "owner_name": "Joycelynn Corpuz",
  "phone_number": "+6807786388"
},{
  "_id": {
    "$oid": "640fd5d2240d49acba9dd198"
  },
  "wallet_id": "rnoGCeA7GaoDdX8LmuimbiauUgBfuEw2tN",
  "owner_name": "Roleen Ronny",
  "phone_number": "+6807753076"
},{
  "_id": {
    "$oid": "640fd90f240d49acba9dd19a"
  },
  "wallet_id": "rJ1pHE1ccjXB4oA4AHvDbeBFVL9gm4JC9Z",
  "owner_name": "Amber Andreas",
  "phone_number": "+6807780535"
},{
  "_id": {
    "$oid": "640fddc5240d49acba9dd19c"
  },
  "wallet_id": "rPN2MFviBA1PNxmf7w3VwjtAsUSJPkHJnh",
  "owner_name": "Eden Uchel",
  "phone_number": "+6807752031"
},{
  "_id": {
    "$oid": "640ff2f9240d49acba9dd1ab"
  },
  "wallet_id": "rPFh3sjP9MNk35whf23q2NdxwpDnWrTpMP",
  "owner_name": "Rison  Nakamura ",
  "phone_number": "+6807755206"
},{
  "_id": {
    "$oid": "640ff75c240d49acba9dd1ad"
  },
  "wallet_id": "rJTZhVFvCyXvqDNqrUrz8bb63Lcvr5kDMc",
  "owner_name": "Marica Thomad",
  "phone_number": "+6807705654"
},{
  "_id": {
    "$oid": "64100b9a240d49acba9dd1af"
  },
  "wallet_id": "rPcsegDMcprg7CGRMLQznb26i2u2bHGJN2",
  "owner_name": "Turang Rengiil",
  "phone_number": "+6807755447"
},{
  "_id": {
    "$oid": "64129e44240d49acba9dd1b7"
  },
  "wallet_id": "rNRKQwaR4Bg57CjD1x2S54gU9Y5AAoSv5s",
  "owner_name": "Sharnnel Sumang",
  "phone_number": "+6807755362"
},{
  "_id": {
    "$oid": "64129e50240d49acba9dd1b9"
  },
  "wallet_id": "rpYPNUFddMUpM8XtVCVGWTyaMvRptTkBVM",
  "owner_name": "Chandler K Ngirmeriil",
  "phone_number": "+6807753374"
},{
  "_id": {
    "$oid": "6412ecf2240d49acba9dd1bb"
  },
  "wallet_id": "rsswJjizqjxuveHr9LZ37jEryyTfMehxYL",
  "owner_name": "Ayla Ngirngesechei ",
  "phone_number": "+6807751031"
},{
  "_id": {
    "$oid": "64139def240d49acba9dd1bd"
  },
  "wallet_id": "rwRr7RSoxHdzWfSEXTPdmMWziKnSHteAqE",
  "owner_name": "Juanita Kloulubak",
  "phone_number": "+6807793296"
},{
  "_id": {
    "$oid": "6419607e240d49acba9dd1bf"
  },
  "wallet_id": "rP1wwEtPLVJXTo5tRid5T89K15cpeYjBA2",
  "owner_name": "Laurence Ierago, Jr. ",
  "phone_number": "+6807784745"
},{
  "_id": {
    "$oid": "6419613c240d49acba9dd1c1"
  },
  "wallet_id": "rHqgpU12MUB6grt4ZNB1gPuNXdFdhhgS7u",
  "owner_name": "Laurence Ierago, Jr. ",
  "phone_number": "+6807784745"
},{
  "_id": {
    "$oid": "642280e2240d49acba9dd1c3"
  },
  "wallet_id": "rJK1FuSNXFUncV2HDNKxiExsjTkzEkkmVX",
  "owner_name": "Jerry Ebas",
  "phone_number": "+6807757530"
},{
  "_id": {
    "$oid": "64238d8d240d49acba9dd1c5"
  },
  "wallet_id": "rKzhtZ8WVEjT5xBdeFaQBch7qdeLZbf8WW",
  "owner_name": "Nicholas  Aquino Jr.",
  "phone_number": "+6807753300"
},{
  "_id": {
    "$oid": "64389063240d49acba9dd1c9"
  },
  "wallet_id": "r9gugkvaBdeKxhb43a9ETwGLvkpxHZFdBD",
  "owner_name": "Irving  Dwight ",
  "phone_number": "+6807751282"
},{
  "_id": {
    "$oid": "64389bcc240d49acba9dd1cb"
  },
  "wallet_id": "r37gZtp3awv3vJTuCC3RYN6v9VAj9QoB2n",
  "owner_name": "herman alfinso",
  "phone_number": "+6807756727"
},{
  "_id": {
    "$oid": "64389f16240d49acba9dd1cd"
  },
  "wallet_id": "rn5xzwjomHRD6f1VvoxfE238ns544UrDVE",
  "owner_name": "Darlynne Takawo",
  "phone_number": "+6807754706"
},{
  "_id": {
    "$oid": "6438a0ec240d49acba9dd1cf"
  },
  "wallet_id": "r9if8cxpp71U9qLwo2BhtCiz7BvMYtXtp4",
  "owner_name": "Rodney Yoshida",
  "phone_number": "+6807754107"
},{
  "_id": {
    "$oid": "6438a2ec240d49acba9dd1d1"
  },
  "wallet_id": "rffj4ppdtnB7ozHEZTPYM5afucFsLpuLpN",
  "owner_name": "Neil     I. Fisher",
  "phone_number": "+6807755685"
},{
  "_id": {
    "$oid": "6438a423240d49acba9dd1d3"
  },
  "wallet_id": "r32QJgRTwtzNtoEejdfZkaf916oswoAvwW",
  "owner_name": "Mel Petrus",
  "phone_number": "+6807794336"
},{
  "_id": {
    "$oid": "6438afb2240d49acba9dd1d5"
  },
  "wallet_id": "rK4m1NR8SctwHBj2y2PC8EWpmHysdf97XB",
  "owner_name": "Heline Roduk",
  "phone_number": "+6807757740"
},{
  "_id": {
    "$oid": "6438c9b7240d49acba9dd1d7"
  },
  "wallet_id": "rMJchvzLWrJdNwZTYX1VgP2p9xiPBnq2j4",
  "owner_name": "ngiraibai lizette",
  "phone_number": "+6807750085"
},{
  "_id": {
    "$oid": "6438cb48240d49acba9dd1d9"
  },
  "wallet_id": "rnxDP3FpdT1pkA4wTGVsmHYWnFwg6LadZg",
  "owner_name": "bolton tengoll",
  "phone_number": "+6807752165"
},{
  "_id": {
    "$oid": "6438f3ba240d49acba9dd1db"
  },
  "wallet_id": "rfvPg5k9m15kpFEqrkPXxALCHsNh6bhZAp",
  "owner_name": "Sharinna Kioshi",
  "phone_number": "+6807768543"
},{
  "_id": {
    "$oid": "64408a6b240d49acba9dd1dd"
  },
  "wallet_id": "r33FCkP3zgjjJApRRNXAE6MBkoJZnqX3Ka",
  "owner_name": "Sweety Kalbesang",
  "phone_number": "+6807751510"
},{
  "_id": {
    "$oid": "64504644240d49acba9dd1e2"
  },
  "wallet_id": "rHi52CB7sfzeujnaf5eVWzNsQmYKNLhWPg",
  "owner_name": "Takamatsu Emesiochel",
  "phone_number": "+6807751209"
}];
}
