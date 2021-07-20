import { render } from 'test-utils';
import userEvent from '@testing-library/user-event';

import { UploadInput } from '@/components';

window.URL.createObjectURL = jest.fn(() => 'https://picsum.photos/id/1018/500');

test('render without crash',() => {
  const { getByLabelText } = render(<UploadInput value={{}}/>);
  getByLabelText('เลือกไฟล์');
});

test('should be able to upload',() => {
  const file = new File(['hello'], 'hello.png', { type: 'image/png' });
  const { getByLabelText } = render(<UploadInput value={{}}/>);
  const input = getByLabelText('เลือกไฟล์');
  userEvent.upload(input, file);
  expect(input.files[0]).toStrictEqual(file);
});

test('render selected image',() => {
  const { getByAltText } = render(<UploadInput value={{ selectedFile: 'https://picsum.photos/id/1018/500' }}/>);
  getByAltText('preview');
});
