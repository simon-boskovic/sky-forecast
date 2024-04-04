export interface IOpmetResponse {
  error: {
    code: number;
    data: null;
    message: string;
  } | null;
  id: string;
  result: {
    placeId: string;
    queryType: string;
    receptionTime: string;
    refs: string[];
    reportTime: Date;
    reportType: string;
    revision: string;
    stationId: string;
    text: string;
    textHTML: string;
  }[];
}

export type TOpmetSuccessResponse = IOpmetResponse['result'];

export type TOpmetErrorResponse = Pick<IOpmetResponse, 'error'>;

export type TOpmetGroupedResponse = {
  [key: string]: IOpmetResponse['result'];
};
