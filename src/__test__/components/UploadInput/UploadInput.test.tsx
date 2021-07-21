import { render, waitFor } from 'test-utils';
import userEvent from '@testing-library/user-event';

import { UploadInput } from '@/components';

window.URL.createObjectURL = jest.fn(() => 'https://picsum.photos/id/1018/500');

test('render without crash',async () => {
  const { getByLabelText } = render(<UploadInput value={{}}/>);
  await waitFor(() => getByLabelText('เลือกไฟล์'),{ timeout: 3000 });
});

test('should be able to upload',() => {
  const file = new File(['hello'], 'hello.png', { type: 'image/png' });
  const { getByLabelText } = render(<UploadInput value={{}}/>);
  const input = getByLabelText('เลือกไฟล์') as HTMLInputElement;
  userEvent.upload(input, file);
  expect(input.files && input.files[0]).toStrictEqual(file);
});

test('render selected image',() => {
  const { getByAltText } = render(<UploadInput value={{ selectedFile: 'https://picsum.photos/id/1018/500' }}/>);
  getByAltText('preview');
});
