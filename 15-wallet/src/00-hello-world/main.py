#   @author     Morgan Bergne
#   @date       June 4 2024
#   @module     main.py
#   @brief      hello world equivalent for the xrpl ledger and wxPython programming

import wx
import xrpl

class TWaXLFrame(wx.Frame):
    def __init__(self, url):
        wx.Frame.__init__(self, None, title="TWaXL", size=wx.Size(800, 400))

        self.client = xrpl.clients.JsonRpcClient(url)

        main_panel = wx.Panel(self)
        self.ledger_info = wx.StaticText(main_panel,
                                         label=self.get_validated_ledger())

    def get_validated_ledger(self):
        try:
            response = self.client.request(xrpl.models.requests.Ledger(
                ledger_index="validated"
            ))
        except Exception as e:
            return f"Failed to get validated ledger from server. ({e})"

        if response.is_successful():
            return f"Latest validated ledger: {response.result['ledger_index']}"
        else:
            return f"Server returned an error: {response.result['error_message']}"

if __name__ == "__main__":
    JSON_RPC_URL = "https://s.altnet.rippletest.net:51234/"
    app = wx.App()
    frame = TWaXLFrame(JSON_RPC_URL)
    frame.Show()

    if AppDelegate:
        delegate = AppDelegate.alloc().init()
        NSApplication.sharedApplication().setDelegate_(delegate)

    sys.stderr = open(os.devnull, 'w')

    app.MainLoop()