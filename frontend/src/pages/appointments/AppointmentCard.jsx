import { Calendar, Clock, User, Stethoscope } from 'lucide-react';
import { Link } from 'react-router';
import ConfirmDelete from './ConfirmDelete';

const AppointmentCard = ({ appointment }) => {
    const { _id, doctorId, reason, date, createdAt } = appointment;
    const { _id: doctorIdStr, name, speciality, image, yearsOfExperience } = doctorId || {};

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            weekday: 'short', 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    };

    const isUpcoming = new Date(date) > new Date();

    return (
        <article className="flex flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-md">
            <div className="flex gap-4 p-5">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                    <img
                        src={image}
                        alt={name || 'Doctor'}
                        className="h-full w-full object-cover"
                        loading="lazy"
                    />
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                        <div>
                            <Link 
                                to={`/doctors/${doctorIdStr}`}
                                className="font-bold text-lg text-foreground hover:text-primary transition-colors"
                            >
                                Dr. {name || 'Unknown Doctor'}
                            </Link>

                        </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(date)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4" />
                            <span>{formatTime(date)}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="rounded-lg mx-5 mb-4">
                <h3>Reason</h3>
                <p className=" bg-blue-50
                rounded-lg mt-2 text-foreground p-3">{reason || 'No reason provided'}</p>
            </div>

            <div className="border-t px-5 py-3 bg-muted/30 flex items-center justify-end gap-2">
                <Link to={`/doctors/${doctorIdStr}`} className='bg-blue-500 text-white rounded-lg 
                cursor-pointer hover:bg-blue-600 flex items-center justify-center gap p-2
                text-sm'>
                        <User className="h-3.5 w-3.5 mr-1.5" />
                        View Doctor Profile
                </Link>
                <ConfirmDelete id={appointment._id} />
            </div>
        </article>
    );
};

export default AppointmentCard;