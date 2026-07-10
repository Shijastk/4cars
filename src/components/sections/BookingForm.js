'use client';
import { useRouter } from 'next/navigation';
import Button from '../ui/Button';
import PickupSearchInput from './PickupSearchInput';

// Same hero widget as the original template. "Search Vehicle" now works: it
// takes the visitor to the fleet listing where they can filter and enquire.
export default function BookingForm() {
  const router = useRouter();

  function search(e) {
    e.preventDefault();
    router.push('/fleet');
  }

  return (
    <form onSubmit={search} className="request-form ftco-animate">
      <h2>Make your trip</h2>
      <PickupSearchInput />
      <div className="d-flex">
        <div className="form-group mr-2">
          <label className="label">Pick-up date</label>
          <input type="text" className="form-control" id="book_pick_date" placeholder="Date" />
        </div>
        <div className="form-group ml-2">
          <label className="label">Drop-off date</label>
          <input type="text" className="form-control" id="book_off_date" placeholder="Date" />
        </div>
      </div>
      <div className="form-group">
        <label className="label">Pick-up time</label>
        <input type="text" className="form-control" id="time_pick" placeholder="Time" />
      </div>
      <div className="form-group">
        <Button type="submit" className="py-3 px-4 w-100">Search Vehicle</Button>
      </div>
    </form>
  );
}
