import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
import Button from '../common/Button';
import Textarea from '../common/Textarea';

const RejectModal = ({ application, onClose, onConfirm, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { rejectionReason: '' } });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Reject Application</h3>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="mb-4 text-sm text-slate-600">
          Rejecting <strong>{application?.businessName}</strong>. Please provide a reason.
        </p>
        <form
          onSubmit={handleSubmit((values) => onConfirm(values.rejectionReason))}
          className="space-y-4"
        >
          <Textarea
            id="rejectionReason"
            label="Rejection Reason"
            error={errors.rejectionReason?.message}
            {...register('rejectionReason', {
              required: 'Rejection reason is required',
              minLength: { value: 10, message: 'Minimum 10 characters' },
            })}
          />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="danger" disabled={isLoading}>
              {isLoading ? 'Rejecting...' : 'Confirm Reject'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RejectModal;
