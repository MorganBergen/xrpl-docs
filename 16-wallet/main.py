from xrpl.wallet import generate_faucet_wallet, XRPLFaucetException
from xrpl.transaction import submit_and_wait
from xrpl.models.transactions import Payment
from xrpl.clients import JsonRpcClient
from xrpl.utils import xrp_to_drops
from xrpl.wallet import Wallet
from xrpl.core import addresscodec
from xrpl.models.requests.account_info import AccountInfo
import traceback
import logging
import time
import json

#  connect to the xrp ledger
client = JsonRpcClient("https://s.altnet.rippletest.net:51234/")

def main():
    
    #  configure logging
    logging.basicConfig(level = logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
    logger = logging.getLogger(__name__)

    try:
        logger.info("starting the application")

        #  get account
        logger.info("generating a test wallet")
        test_wallet = generate_faucet_wallet(client, debug=True)
        logger.info(f"test wallet generated:")
        logger.info(f"public key: {test_wallet.public_key}")
        logger.info(f"private key: {test_wallet.private_key}")
        logger.info(f"classic address: {test_wallet.classic_address}")

        #  prepare transaction
        tx_payment = Payment(
            account = test_wallet.classic_address,
            amount = xrp_to_drops(22),
            destination = "rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe"
        )

        #  sign and submit transaction
        tx_response = submit_and_wait(tx_payment, client, test_wallet)
        
        #  derive an x address from the classic address
        #  https://xrpaddress.info/
        test_xaddress = addresscodec.classic_address_to_xaddress(test_wallet.classic_address, tag=12345, is_test_network=True)
        logger.info(f"classic address:  {test_wallet.classic_address}")
        logger.info(f"x-address:  {test_xaddress}")
        
    except XRPLFaucetException as e:
        logger.error("failed to fund wallet using faucet")
        logger.error(f"error: {e}")
        traceback.print_exc()

    except Exception as e:
        logger.error(f"An error occurred: {e}")
        traceback.print_exc()

    acct_info = AccountInfo(
        account = test_wallet.classic_address,
        ledger_index = "validated",
        strict = True,
    )

    response = client.request(acct_info)

    result = response.result

    logger.info(f"response.status:  {response.status}")

    logger.info(json.dumps(response.result, indent=4, sort_keys=True))
    

if __name__ == "__main__":
    main()


# #  prepare payment

# my_tx_payment = Payment(
#     account = test_wallet.classic_address,
#     amount = xrp_to_drops(22),
#     destination = "rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe"
# )

# #  sign and submit the transaction 

# tx_response = submit_and_wait(my_tx_payment, client, test_wallet) 

'''
❯ python main.py      
Attempting to fund address r4Dw2Bb84KpcjxeNj5d9GGQEgu3Zq3rHYH
Faucet fund successful.
public_key: EDD0E5EC599F7E87A54C6BF50FC299CB7B9B6CE7E3C90A1827873B695526147BF1
private_key: -HIDDEN-
classic_address: r4Dw2Bb84KpcjxeNj5d9GGQEgu3Zq3rHYH
'''