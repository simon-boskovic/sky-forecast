export interface IOpmetQuery {
  id: string;
  method: 'query';
  params: [
    {
      id: string;
      reportTypes: string[];
      stations?: string[];
      countries?: string[];
    }
  ];
}
