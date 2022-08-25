export interface INode {
  id: string;
  name: string;
  description?: string;
  version?: string;
  isSyncedWithBridge?: boolean;
  markup?: string;
  size?: number;
  lastUpdatedAt?: Date;
  url?: string;
  children?: INode[];
}