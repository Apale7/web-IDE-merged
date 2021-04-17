import React from "react";
import { Terminal } from "xterm";
import { AttachAddon } from "xterm-addon-attach";
import "xterm/css/xterm.css";
import { isLogin } from "../../auth/login";
import { autoRefresh } from "../../axios/axiosSetting";
import { getAccessToken } from "../../cache/cache";

class MyTerminal extends React.Component {
  constructor(props) {
    super(props);
    this.closed = true;
    this.term = null;
    this.host = props.host;
    this.terminalSocket = null;
    this.container_id = this.props.container_id;
    this.runRealTerminal = this.runRealTerminal.bind(this);
    this.closeRealTerminal = this.closeRealTerminal.bind(this);
    this.ConnectToServer = this.ConnectToServer.bind(this);
    this.token = getAccessToken();
    this.reconnecting = false;
  }
  runRealTerminal(res) {
    this.closed = false;
  }
  closeRealTerminal() {
    console.log("close");
    this.closed = true;
    this.term.writeln("");
    this.term.writeln("Terminl closed, press any button to restart...");
    this.term.writeln("");
  }
  ConnectToServer(host) {
    this.remoteHost = `ws://${host}/echo/${this.container_id}?token=${this.token}`;
    this.terminalSocket = new WebSocket(this.remoteHost);
    this.terminalSocket.onopen = this.runRealTerminal;
    this.terminalSocket.onclose = this.closeRealTerminal;
    this.terminalSocket.onerror = this.errorRealTerminal;
    this.term.loadAddon(new AttachAddon(this.terminalSocket));
  }
  render() {
    return <div id="terminal"></div>;
  }
  componentDidMount() {
    let terminalContainer = document.getElementById("terminal");
    this.term = new Terminal({
      rows: 15,
    });
    // this.term = new Terminal({
    //     cursorBlink: true
    // });
    this.term.open(terminalContainer, true);
    this.ConnectToServer(this.host);
    this.term._initialized = true;
    console.log("mounted is going on");
    var __this = this;
    this.term.onData(function (key) {
      if (__this.reconnecting) {
        return;
      }

      if (!isLogin()) {
        __this.term.writeln("trying to auto_refresh...");
        await autoRefresh().then(() => {
          __this.token = getAccessToken();
        });
      }

      if (__this.closed === true) {
        __this.reconnecting = true;
        __this.term.writeln("Terminl reconnected...");
        __this.ConnectToServer(__this.host);
        __this.reconnecting = false;
      }
    });
  }
}

export default MyTerminal;
