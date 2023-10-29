.PHONY: localnode deploy

localnode:
	@echo "Starting local node..."
	npx hardhat node

deploy/vaults/localhost:
	@echo "Deploying vaults..."
	npx hardhat ignition deploy --parameters ignition/parameters/localhost.json ignition/modules/Vault.ts --network localhost

deploy/vaults/sepolia:
	@echo "Deploying vaults..."
	npx hardhat ignition deploy --parameters ignition/parameters/sepolia.json ignition/modules/Vault.ts --network sepolia

visualize:
	npx hardhat ignition visualize ignition/modules/Vault.ts
