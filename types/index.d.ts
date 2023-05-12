import { DocumentNode } from "graphql";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";

export type GqlRequest = <
  ResultT = Record<string, any>,
  VariablesT = Record<string, any>
>(
  query: string | DocumentNode | TypedDocumentNode<ResultT, VariablesT>,
  variables?: VariablesT,
  options?: {
    checkPermissions?: boolean;
    headers?: Record<string, any>;
  }
) => Promise<ResultT>;

export type FunctionContext = {
  api: {
    gqlRequest: GqlRequest;
    url: string;
  };
  invokeFunction: <
    ResponseT extends InvokeFunctionResponse = InvokeFunctionResponse,
    ArgsT = Record<string, any>
  >(
    name: string,
    args?: ArgsT,
    options?: { waitForResponse: boolean; checkPermissions?: boolean }
  ) => Promise<ResponseT>;
  workspaceId: string;
  environmentId: string;
  environmentName: string;
  userId?: string;
};

export type InvokeFunctionResponse<ResultT = any> = {
  completed: boolean;
  result?: ResultT;
  error?: string;
};

export type FunctionEvent<
  DataT = Record<string, any>,
  ExtendObjectT = Record<string, any>
> = {
  data: DataT;
  body: string;
  headers: Record<string, string | undefined>;
} & ExtendObjectT;

export type FunctionResponse<
  DataT = Record<string, any>,
  ExtendObjectT = Record<string, any>,
  ErrorT = Record<string, any>
> = Promise<(FunctionResponseObject<DataT, ErrorT> & ExtendObjectT) | void>;

export type FunctionResponseObject<
  DataT = Record<string, any>,
  ErrorT = Record<string, any>
> = {
  data?: DataT;
  errors?: ErrorT[];
};

export type BeforeCreateTriggerFunctionEvent<
  DataT = Record<string, any>,
  ExtendObjectT = Record<string, any>
> = {
  data: DataT;
  headers: Record<string, string | undefined>;
} & ExtendObjectT;

export type BeforeUpdateTriggerFunctionEvent<
  DataT = Record<string, any>,
  OriginalObjectT = Record<string, any>,
  FilterT = Record<string, any>,
  ExtendObjectT = Record<string, any>
> = {
  data: DataT;
  filter?: FilterT;
  force?: boolean;
  destroyDetached?: boolean;
  originalObject: OriginalObjectT & { id: string };
  headers: Record<string, string | undefined>;
} & ExtendObjectT;

export type BeforeDeleteTriggerFunctionEvent<
  OriginalObjectT = Record<string, any>,
  FilterT = Record<string, any>,
  ExtendObjectT = Record<string, any>
> = {
  filter: FilterT;
  force?: boolean;
  destroyDeleted?: boolean;
  originalObject: OriginalObjectT & { id: string };
  headers: Record<string, string | undefined>;
} & ExtendObjectT;

export type AfterCreateTriggerFunctionEvent<
  DataT = Record<string, any>,
  OriginalDataT = Record<string, any>,
  ExtendObjectT = Record<string, any>
> = {
  data: DataT & { id: string };
  originalData: OriginalDataT;
  headers: Record<string, string | undefined>;
} & ExtendObjectT;

export type AfterUpdateTriggerFunctionEvent<
  DataT = Record<string, any>,
  OriginalDataT = Record<string, any>,
  OriginalObjectT = Record<string, any>,
  ExtendObjectT = Record<string, any>
> = {
  data: DataT & { id: string };
  originalData: OriginalDataT;
  originalObject: OriginalObjectT & { id: string };
  headers: Record<string, string | undefined>;
} & ExtendObjectT;

export type AfterDeleteTriggerFunctionEvent<
  DataT = Record<string, any>,
  OriginalDataT = Record<string, any>,
  OriginalObjectT = Record<string, any>,
  ExtendObjectT = Record<string, any>
> = {
  data: DataT & { id: string };
  originalObject: OriginalObjectT & { id: string };
  headers: Record<string, string | undefined>;
} & ExtendObjectT;

export type WebhookFunctionEvent<T extends string = string> = {
  body: string;
  headers: Record<string, string | undefined>;
  pathParameters?: Record<T, string | undefined>;
};

export type WebhookResponse = {
  statusCode: number;
  headers?: Record<string, string | undefined>;
  body?: string;
};
