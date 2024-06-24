export class Chef {
    constructor(
        public displayName:string,
        public isActive:boolean,
        public IdImgURL:string,
        public PhoneNumber:string,
        public walletNumber:string,
        public fullAddress:string,
        public paymentMethod:ChefPaymentMethod,
    ){}
}


export enum ChefPaymentMethod { 
    Cash="Cash",
    MobileWallet="Mobile Wallet",
    Card="Card",
}

// public string? DisplayName { get; set; }

// public string? IdImgURL { get; set; }
// public string? PhoneNumber { get; set; }
// public string? WalletNumber { get; set; }
// public string? FullAddress { get; set; }
// public ChefPaymentMethod? paymentMethod { get; set; } = ChefPaymentMethod.Cash;

// [DefaultValue(false)]
// public bool IsActive { get; set; }