#  xrpl private network

```
docker run -it --platform linux/amd64 \
    --entrypoint /bin/bash \
    xrpllabsofficial/xrpld:latest

cd /opt/ripple/bin && ./validator-keys create_keys --keyfile ./validator-keys.json

cat ./validator-keys.json

./validator-keys create_token --keyfile ./validator-keys.json
```
##  `validator_1`

```
❯ docker run -it --platform linux/amd64 \
    --entrypoint /bin/bash \
    xrpllabsofficial/xrpld:latest
root@28fa596f096e:/#
root@28fa596f096e:/# cd /opt/ripple/bin && ./validator-keys create_keys --keyfile ./validator-keys.json
Validator keys stored in ./validator-keys.json

This file should be stored securely and not shared.

root@28fa596f096e:/opt/ripple/bin# cat ./validator-keys.json
{
   "key_type" : "ed25519",
   "public_key" : "nHUFWnkwNxBh7w2GQyyBhkmCVYHv67mG6wGqWkEF4rPF8eaF9GL2",
   "revoked" : false,
   "secret_key" : "pahcZMFFHP3pnYYEo3EJjrJyMSg6P37vgLEZufGA5qGG5g6uFZS",
   "token_sequence" : 0
}
root@28fa596f096e:/opt/ripple/bin# ./validator-keys create_token --keyfile ./validator-keys.json
Update rippled.cfg file with these values and restart rippled:

# validator public key: nHUFWnkwNxBh7w2GQyyBhkmCVYHv67mG6wGqWkEF4rPF8eaF9GL2

[validator_token]
eyJtYW5pZmVzdCI6IkpBQUFBQUZ4SWUzQkpsdjNFVzZQM0lxdmxUaEVDTTl4cFZ4cGg3cEJW
MVZYQUM5TkF2U28wM01oQXJpY1BseUJkNWR3eFZKbHBGcXJ4N2FPSlZqOHBCVUpFcTNhVi9J
Z28ydWJka2N3UlFJaEFPbHJxL0pxU0Job1BaVWRkaTc5blNvZmhmZDlGaHgvVmNTQXFzbGNS
RlF6QWlBWHY2YUZZOHRqN0toV0EvRENKN1kvajczZjRoVnhnM2tRczFqVUpzVWhYbkFTUU9m
RjQ3ZmNTdWVFeGpMWUxBK0tNRndMcHdhZHJlblJaRFliZ1JWbU5DV29nNkNoZlo2YXhoSEhF
VkloNGh2MFBvblZBbnNjQTgzYWRLai9ybW1McGd3PSIsInZhbGlkYXRpb25fc2VjcmV0X2tl
eSI6IkEzNkQxRDAxM0Y1QjI4NTg4RkJERTFDREU5QjQzN0U3QjNEMzFFMzk2N0JBNzUzM0ZB
MTUyMzM4RDc3QTBCODQifQ==

root@28fa596f096e:/opt/ripple/bin#
```


##  `validator_2`

```
❯ docker run -it --platform linux/amd64 \
    --entrypoint /bin/bash \
    xrpllabsofficial/xrpld:latest

root@3b425ba165a5:/# cd /opt/ripple/bin && ./validator-keys create_keys --keyfile ./validator-keys.json
Validator keys stored in ./validator-keys.json

This file should be stored securely and not shared.

root@3b425ba165a5:/opt/ripple/bin#
root@3b425ba165a5:/opt/ripple/bin# cat ./validator-keys.json
{
   "key_type" : "ed25519",
   "public_key" : "nHBRECMGtvMBESxgVJQdE33Jj5bCSYx8SwMZbPP3tXZvB278Pdb2",
   "revoked" : false,
   "secret_key" : "pnxkJkzPcwmY3kG8sRRbKmiRnvPP8f9ggc7oBhtH4i71CRMVxjC",
   "token_sequence" : 0
}
root@3b425ba165a5:/opt/ripple/bin# ./validator-keys create_token --keyfile ./validator-keys.json
Update rippled.cfg file with these values and restart rippled:

# validator public key: nHBRECMGtvMBESxgVJQdE33Jj5bCSYx8SwMZbPP3tXZvB278Pdb2

[validator_token]
eyJtYW5pZmVzdCI6IkpBQUFBQUZ4SWUwSXFqWGpkUGhxVzM5cXZJV3prc3B1K3IwL3pKQkxS
NWR0QUxHbG1MbFpsbk1oQTBCekdsMldOc25tdVRoT3FpM21DdnI4c2ZUdng3UGdpVjZpWjJu
TmdoZE9ka2N3UlFJaEFMK014MDNBZlUrZnFBZld0TWhvbytnZHZHS0hUOGEyOG5OeUI0ZERG
VHpHQWlCRnVFSUtPTTFheHlsWFBTaWk2NktybkhQOWJhQkRzcFI0dnFhcDVzajZRWEFTUUNm
cTRwV095MkdHRVRvakh5K0laTEV5bEVuQWpnakRQMDJtbXBpQ2lHMThCWERncUduTTN3VTc5
OGNzdGF4bk9LTXZmNnkwZ3F6bHRlTUViSy9JOXdvPSIsInZhbGlkYXRpb25fc2VjcmV0X2tl
eSI6IjhERTNBNjVDNUI0MzVBQzhCMDYzQTFGOUE2RUMxNjQ5NDMwRTFDQzlDNEQxNTkxQzRC
MENBRTM1OTIzRjU3QjIifQ==
```

##  `validator_3`


```
❯ docker run -it --platform linux/amd64 \
    --entrypoint /bin/bash \
    xrpllabsofficial/xrpld:latest

root@b65b9c56a67a:/# cd /opt/ripple/bin && ./validator-keys create_keys --keyfile ./validator-keys.json
Validator keys stored in ./validator-keys.json

This file should be stored securely and not shared.

root@b65b9c56a67a:/opt/ripple/bin#
root@b65b9c56a67a:/opt/ripple/bin# cat ./validator-keys.json
{
   "key_type" : "ed25519",
   "public_key" : "nHBxnoaquN8EcgyCwEnKLNZ78yNT2TvszKQy1FoxZXNUAZKmznMb",
   "revoked" : false,
   "secret_key" : "pa1e7A9DYKNWsKNsy6K1zWKEQKj8a15RB7MmbxYmhkeWmKk54Fq",
   "token_sequence" : 0
}
root@b65b9c56a67a:/opt/ripple/bin# ./validator-keys create_token --keyfile ./validator-keys.json
Update rippled.cfg file with these values and restart rippled:

# validator public key: nHBxnoaquN8EcgyCwEnKLNZ78yNT2TvszKQy1FoxZXNUAZKmznMb

[validator_token]
eyJtYW5pZmVzdCI6IkpBQUFBQUZ4SWUxT3F2ejF3ZktXTGQrR2VHakR3U0FDR0dVUVRKemlI
RENWMVozNjQ2Z3d2M01oQW5ueU5pVDFnN2J2emRVb2VsdnJDSUlpeUJpRkNLV0x2Y09DRGda
WXA2am1ka2N3UlFJaEFOcHBxYVZ3Y2hhKzNOdERQbXRmejdndGFFNG04QVJhVkcvYmNpWFN6
dmhIQWlBeHh3S0Fxb0N5dHhrUjd3VjZKenlGekxXWUM5SktuUVp0YkxBOHlrWXBMbkFTUU01
WFlWcjZsM2Fuc0ZFT3plcThwem12RGUvQnNYdWJ4OG9uU1hBZzI1S3I2alZsOGFWSU0wdHRv
YitET3JKMlZvaHY0NllKbHhvVGtZZVh6M01HSEFVPSIsInZhbGlkYXRpb25fc2VjcmV0X2tl
eSI6IjU4QjIxRTJCREYxMTg5NjBFRTUyRDBDQ0QxRUVEOUE3QkIzMDIzMjA4MTVEM0MxMTM2
Qjg1NjgzNzNFM0UyNjUifQ==
```

```
xrpl-private-network/
    ├── validator_1/
    │   └── config
    ├── validator_2/
    │   └── config
    └── validator_3/
        └── config
```


```
[server]
port_rpc_admin_local
port_rpc
port_ws_admin_local
port_ws_public
port_peer
# ssl_key = /etc/ssl/private/server.key
# ssl_cert = /etc/ssl/certs/server.crt

[port_rpc_admin_local]
port = 5005
ip = 127.0.0.1
admin = 127.0.0.1
protocol = http

[port_ws_admin_local]
port = 6006
ip = 127.0.0.1
admin = 127.0.0.1
protocol = ws

[port_ws_public]
port = 80
ip = 0.0.0.0
protocol = ws

[port_peer]
port = 51235
ip = 0.0.0.0
protocol = peer

[port_rpc]
port = 51234
ip = 0.0.0.0
admin = 127.0.0.1
protocol = https, http

[node_size]
small
# tiny
# small
# medium
# large
# huge

[node_db]
type=NuDB
path=/var/lib/rippled/db/nudb
advisory_delete=0

# How many ledgers do we want to keep (history)?
# Integer value that defines the number of ledgers
# between online deletion events
online_delete=256

[ledger_history]
# How many ledgers do we want to keep (history)?
# Integer value (ledger count)
# or (if you have lots of TB SSD storage): 'full'
256

[database_path]
/var/lib/rippled/db

[debug_logfile]
/var/log/rippled/debug.log

[sntp_servers]
time.windows.com
time.apple.com
time.nist.gov
pool.ntp.org

[ips_fixed]
validator_1 51235
validator_2 51235
validator_3 51235

[validators_file]
validators.txt

[rpc_startup]
{ "command": "log_level", "severity": "warning" }
# severity (order: lots of information .. only errors)
# debug
# info
# warn
# error
# fatal

[ssl_verify]
0

[validator_token]

```

start the validator
create docker compose 

```
version: "3.9"
services:
  validator_1:
    platform: linux/amd64
    container_name: validator_1
    image: "xrpllabsofficial/xrpld"
    ports:
      - "8001:80"
      - "5006:5005"
      - "4001:6006"
      - "9001:51235"
    volumes:
      - ./validator_1/config:/config/
  validator_2:
    platform: linux/amd64
    container_name: validator_2
    image: "xrpllabsofficial/xrpld"
    ports:
      - "8002:80"
      - "5007:5005"
      - "4002:6006"
      - "9002:51235"
    volumes:
      - ./validator_2/config:/config/
  validator_3:
    platform: linux/amd64
    container_name: validator_3
    image: "xrpllabsofficial/xrpld"
    ports:
      - "8003:80"
      - "5008:5005"
      - "4003:6006"
      - "9003:51235"
    volumes:
      - ./validator_3/config:/config/
```

```
docker-compose up -d

❯ docker-compose up -d
[+] Building 0.0s (0/0)
[+] Running 3/3
 ✔ Container validator_2  Started                                                                   0.3s
 ✔ Container validator_3  Started                                                                   0.2s
 ✔ Container validator_1  Started                                                                   0.3s
```

```
docker ps

Last login: Fri Jun 23 16:34:33 on ttys006
❯ docker ps
CONTAINER ID   IMAGE                    COMMAND            CREATED          STATUS         PORTS                                                                                                    NAMES
19bcdb685969   xrpllabsofficial/xrpld   "/entrypoint.sh"   22 minutes ago   Up 6 seconds   443/tcp, 0.0.0.0:8001->80/tcp, 0.0.0.0:5006->5005/tcp, 0.0.0.0:4001->6006/tcp, 0.0.0.0:9001->51235/tcp   validator_1
2f955ae12713   xrpllabsofficial/xrpld   "/entrypoint.sh"   22 minutes ago   Up 6 seconds   443/tcp, 0.0.0.0:8002->80/tcp, 0.0.0.0:5007->5005/tcp, 0.0.0.0:4002->6006/tcp, 0.0.0.0:9002->51235/tcp   validator_2
8ced1e7c57ca   xrpllabsofficial/xrpld   "/entrypoint.sh"   22 minutes ago   Up 6 seconds   443/tcp, 0.0.0.0:8003->80/tcp, 0.0.0.0:5008->5005/tcp, 0.0.0.0:4003->6006/tcp, 0.0.0.0:9003->51235/tcp   validator_3
```


1.  `docker logs -f validator_1`

2.  `docker logs -f validator_2`

3.  `docker logs -f validator_3`


#  error

```
❯ docker-compose up -d
[+] Building 0.0s (0/0)
[+] Running 3/3
 ✔ Container validator_2  Started                                                                   0.3s
 ✔ Container validator_3  Started                                                                   0.2s
 ✔ Container validator_1  Started                                                                   0.3s
❯ docker logs -f validator_1
Args:
    >> []

Env Args:
    >> []

Env:
_=/usr/bin/printenv
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
SHLVL=1
HOME=/root
PWD=/
HOSTNAME=19bcdb685969

Existing rippled config at host /config/, using.
Loading: "/etc/opt/ripple/rippled.cfg"
2023-Jun-23 21:18:31.563458137 UTC JobQueue:NFO Using 6  threads
terminate called after throwing an instance of 'std::runtime_error'
  what():  Missing [node_db] entry in configuration file
qemu: uncaught target signal 6 (Aborted) - core dumped
Args:
    >> []

Env Args:
    >> []

Env:
_=/usr/bin/printenv
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
SHLVL=1
HOME=/root
PWD=/
HOSTNAME=19bcdb685969

Existing rippled config at host /config/, using.
Loading: "/etc/opt/ripple/rippled.cfg"
2023-Jun-23 21:40:38.351089084 UTC JobQueue:NFO Using 6  threads
terminate called after throwing an instance of 'std::runtime_error'
  what():  Missing [node_db] entry in configuration file
qemu: uncaught target signal 6 (Aborted) - core dumped
^C
```
