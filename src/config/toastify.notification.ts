import Swal from 'sweetalert2';

interface NotificationOptions {
  title?: string;
  icon?: 'success' | 'error' | 'warning' | 'info' | 'question';
  position?: 'top' | 'top-start' | 'top-end' | 'center' | 'center-start' | 'center-end' | 'bottom' | 'bottom-start' | 'bottom-end';
  timer?: number;
  color: string
}

export const notify = ({
  title = '',
  icon = 'info',
  position = 'top-end',
  timer = 3000,
  color
}: NotificationOptions) => {
  return Swal.fire({
    toast: true,
    title,
    icon,
    position,
    showConfirmButton: false,
    timer,
    timerProgressBar: true,
    background: '#272a2c',
    color:color,
    
  });
};
