declare module "midtrans-client" {
  interface SnapOptions {
    isProduction: boolean;
    serverKey: string;
    clientKey: string;
  }

  interface TransactionDetails {
    order_id: string;
    gross_amount: number;
  }

  interface TransactionParams {
    transaction_details: TransactionDetails;
    customer_details?: Record<string, any>;
    item_details?: Record<string, any>[];
  }

  interface TransactionResponse {
    token: string;
    redirect_url: string;
  }

  export class Snap {
    constructor(options: SnapOptions);
    createTransaction(params: TransactionParams): Promise<TransactionResponse>;
  }
}
