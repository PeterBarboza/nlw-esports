export function convertMinutesToHourString(minutesAmmount: number) {
  const hours = String(Math.floor(minutesAmmount / 60)).padStart(2, "0")
  const minutes = String(minutesAmmount % 60).padStart(2, "0")

  return `${hours}:${minutes}`
}
