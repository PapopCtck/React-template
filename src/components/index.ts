import { lazy } from 'react';

//components
const Alert = lazy(() => import('./Alert'));
const Avatar = lazy(() => import('./Avatar'));
const Button = lazy(() => import('./Button'));
const Card = lazy(() => import('./Card'));
const Checkbox = lazy(() => import('./Checkbox'));
const Collapse = lazy(() => import('./Collapse'));
const DatePicker = lazy(() => import('./DatePicker'));
const DynamicForm = lazy(() => import('./DynamicForm'));
const Form = lazy(() => import('./Form'));
const Header = lazy(() => import('./Header'));
const Input = lazy(() => import('./Input'));
const InputWithLength = lazy(() => import('./InputWithLength'));
const LegacyDatepicker = lazy(() => import('./LegacyDatePicker'));
const LegacyTimePicker = lazy(() => import('./LegacyTimePicker'));
const Modal = lazy(() => import('./Modal'));
const OTPInput = lazy(() => import('./OTPInput'));
const Pagination = lazy(() => import('./Pagination'));
const ProgressBar = lazy(() => import('./ProgressBar'));
const ProgressiveImage = lazy(() => import('./ProgressiveImage'));
const ReduxAlerts = lazy(() => import('./ReduxAlerts'));
const Select = lazy(() => import('./Select'));
const Skeleton = lazy(() => import('./Skeleton'));
const StoryAvatar = lazy(() => import('./StoryAvatar'));
const Table = lazy(() => import('./Table'));
const TextArea = lazy(() => import('./TextArea'));
const TextGradient = lazy(() => import('./TextGradient'));
const UploadInput = lazy(() => import('./UploadInput'));

//interfaces
export type { IAlert } from './Alert/Alert.interfaces';
export type { IAvatar } from './Avatar/Avatar.interfaces';
export type { IButton } from './Button/Button.interfaces';
export type { ICheckbox } from './Checkbox/Checkbox.interfaces';
export type { ICollapse } from './Collapse/Collapse.interfaces';
export type { IDatePicker } from './DatePicker/DatePicker.interfaces';
export type { IDynamicForm,IDynamicFormTemplate } from './DynamicForm/DynamicForm.interfaces';
export type { IForm } from './Form/Form.interfaces';
export type { IHeader } from './Header/Header.interfaces';
export type { IInputWithLength } from './Input/Input.interfaces';
export type { ILegacyDatepicker } from './DatePicker/DatePicker.interfaces';
export type { ILegacyTimepicker } from './DatePicker/DatePicker.interfaces';
export type { IModal } from './Modal/Modal.interfaces';
export type { IOTPInput } from './OTPInput/OTPInput.interfaces';
export type { IPagination } from './Pagination/Pagination.interfaces';
export type { IProgressBar } from './ProgressBar/ProgressBar.interfaces';
export type { IProgressiveImage } from './ProgressiveImage/ProgressiveImage.interfaces';
export type { IReduxAlerts } from './Alert/Alert.interfaces';
export type { ISelect, ICustomSelectProps } from './Select/Select.interfaces';
export type { ISkeleton } from './Skeleton/Skeleton.interfaces';
export type { IStoryAvatar } from './Avatar/Avatar.interfaces';
export type { ITextArea } from './TextArea/TextArea.interfaces';
export type { ITextGradient } from './TextGradient/TextGradient.interfaces';
export type { IUploadInput } from './UploadInput/UploadInput.interfaces';

export {
  //components
  Alert,
  Avatar,
  Button,
  Card,
  Checkbox,
  Collapse,
  DatePicker,
  DynamicForm,
  Form,
  Header,
  Input,
  InputWithLength,
  LegacyDatepicker,
  LegacyTimePicker,
  Modal,
  OTPInput,
  Pagination,
  ProgressBar,
  ProgressiveImage,
  ReduxAlerts,
  Select,
  Skeleton,
  StoryAvatar,
  Table,
  TextArea,
  TextGradient,
  UploadInput,
};

