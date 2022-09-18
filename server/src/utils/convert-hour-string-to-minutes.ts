/**
 * Convert hours in minutes
 * @param {string} hourString - expected format HH:MM. Example => "12:00"
 *
 **/

export function convertHourStringToMinutes(hourString: string) {
  const [hours, minutes] = hourString.split(":").map(Number)

  const hoursAmmount = hours * 60 + minutes

  return hoursAmmount
}

export function validateHoursFormat(hourString: string) {
  const isValidFormat = RegExp(/([0-2][0-9]:[0-5][0-9])/).test(hourString)
  if (!isValidFormat) return false

  const [hours, minutes] = hourString.split(":")
  if (hours.length != 2 || minutes.length != 2) return false

  return true
}
