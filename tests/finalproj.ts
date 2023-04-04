import assert from "assert";
import * as anchor from "@project-serum/anchor";
const {SystemProgram} = anchor.web3


describe("finalproj", () => {
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.Finalproj;
  const baseAccount = anchor.web3.Keypair.generate();
  let _baseAccount
  it("An account is initialized: ", async function() {
   
    await program.rpc.initialize("My first message", {
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [baseAccount],
    });

    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log("Data: ", account.data);
    assert.ok(account.data === "My first message");
      _baseAccount = baseAccount;
  });

  it("Update the account previously created: ", async function() {
     const baseAccount = _baseAccount;

    await program.rpc.update("My second message", {
      accounts: {
        baseAccount: baseAccount.publicKey,
      },
    });

    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log("Updated data: ", account.data);
    assert.ok(account.data === "My second message");
    console.log("All account data: ", account);

    assert.ok(account.dataList.length === 2);
  });
});