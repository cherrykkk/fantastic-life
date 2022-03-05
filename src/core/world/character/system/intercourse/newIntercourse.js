import Intercourse from "./Intercourse";
import Relationship from "./Relationship";

export function newIntercourse(theFamily) {
  let intercourse = new Intercourse()

  const { host,hostess } = theFamily.familyMembers

  intercourse.relationships.push(new Relationship(host,"父亲",1))
  intercourse.relationships.push(new Relationship(hostess,"母亲",1))

  return intercourse
}