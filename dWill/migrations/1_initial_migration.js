const Migrations = artifacts.require("Migrations");
const Will = artifacts.require("Will");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Will);
};
