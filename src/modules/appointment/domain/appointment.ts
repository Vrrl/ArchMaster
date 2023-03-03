export interface AppointmentProps {
    startsAt: Date
    endsAt: Date
    customer: string
}

export class Appointment {
    private props: AppointmentProps

    constructor(props: AppointmentProps){
        if (props.startsAt <= new Date()){
            throw new Error("Cannot start before now");
        }
        
        // TODO: the date comparation have a bug with comparing dates with different month,
        // probably dowsnt know what timezone use
        if (props.endsAt <= props.startsAt){
            throw new Error("Cannot end before start date");
        }

        this.props = props
    }

    get customer(): string {
        return this.props.customer;
    }
}