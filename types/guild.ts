export type Guild = {
  id: string,
  name: string,
  icon: string,
  banner: string | undefined,
  owner: boolean,
  permissions: number,
  permissions_new: string,
  features: string[]
}
