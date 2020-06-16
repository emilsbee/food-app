export const orderByDays = (data) => {
    const weekExample = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    var daysVar = []
    

    weekExample.forEach((day) => {
        data.forEach((fullDay) => {
            if (fullDay.day === day) {
                daysVar.push(fullDay)
            }
        })
    })
    return daysVar
} 