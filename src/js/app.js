App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  hasVoted: false,

  init: function() {
    return App.initWeb3();
  },
  initWeb3: function() {
    if (typeof window.ethereum !== "undefined") {
      console.log("We see Metamask");
      ethereum.request({method:"eth_requestAccounts"});
      App.web3Provider = ethereum;
      web3 = new Web3(ethereum);

    }
    return App.initContract();
  },
  initContract: function() {
    $.getJSON("Election.json", function(election) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Election = TruffleContract(election);

      // Connect provider to interact with contract
      App.contracts.Election.setProvider(App.web3Provider);

      return App.render();
    });
  },
  render: function() {
    // Load Metamask account info
    ethereum.enable().then(function(account){
      App.account = account[0];
      if (App.account == "undefined"){
      }
      $("#accountAddress1").html("Your Account: " + account);
    });
    // Load deployed smart contract data
    // we created the truffle contract obj in the initContract function
    App.contracts.Election.deployed().then(function(instance) {
      electionInstance = instance;
      return electionInstance.candidatesCount();
    }).then(function(candidatesCount) {
      console.log(candidatesCount);
      $("#candidatesCount").html("Your Contract has: " + candidatesCount + " candidates");
    });
  },
};
$(function() {
  $(window).load(function() {
    App.init();
  });
});