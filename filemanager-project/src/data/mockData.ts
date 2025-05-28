import { FileItem, FolderItem } from '../types/files';
import { v4 as uuidv4 } from 'uuid';

// Helper function to create file items
const createFile = (
  name: string,
  type: string,
  size: number,
  path: string,
  isDirectory: boolean = false
): FileItem => {
  return {
    id: uuidv4(),
    name,
    type,
    size,
    modified: new Date(Date.now() - Math.random() * 10000000000),
    path,
    isDirectory,
  };
};

// Helper function to create folder items
const createFolder = (
  name: string,
  path: string,
  children: FileItem[] = []
): FolderItem => {
  return {
    id: uuidv4(),
    name,
    type: 'folder',
    size: 0,
    modified: new Date(Date.now() - Math.random() * 10000000000),
    path,
    isDirectory: true,
    children,
    isExpanded: false,
  };
};

// Create a nested folder structure with files
export const createMockFileSystem = (): FolderItem => {
  const documents = createFolder('Documents', '/Documents', [
    createFile('Resume.pdf', 'pdf', 2500000, '/Documents/Resume.pdf'),
    createFile('Notes.txt', 'txt', 1200, '/Documents/Notes.txt'),
    createFolder('Projects', '/Documents/Projects', [
      createFile('Project1.docx', 'docx', 3500000, '/Documents/Projects/Project1.docx'),
      createFile('Budget.xlsx', 'xlsx', 4200000, '/Documents/Projects/Budget.xlsx'),
    ]),
  ]);

  const pictures = createFolder('Pictures', '/Pictures', [
    createFile('Vacation.jpg', 'jpg', 8500000, '/Pictures/Vacation.jpg'),
    createFile('Family.png', 'png', 7200000, '/Pictures/Family.png'),
    createFolder('Wedding', '/Pictures/Wedding', [
      createFile('Image1.jpg', 'jpg', 9500000, '/Pictures/Wedding/Image1.jpg'),
      createFile('Image2.jpg', 'jpg', 8700000, '/Pictures/Wedding/Image2.jpg'),
    ]),
  ]);

  const music = createFolder('Music', '/Music', [
    createFile('Song1.mp3', 'mp3', 12000000, '/Music/Song1.mp3'),
    createFile('Playlist.m3u', 'm3u', 2300, '/Music/Playlist.m3u'),
  ]);

  const videos = createFolder('Videos', '/Videos', [
    createFile('Movie.mp4', 'mp4', 350000000, '/Videos/Movie.mp4'),
    createFile('Clip.avi', 'avi', 45000000, '/Videos/Clip.avi'),
  ]);

  const downloads = createFolder('Downloads', '/Downloads', [
    createFile('Setup.exe', 'exe', 145000000, '/Downloads/Setup.exe'),
    createFile('Manual.pdf', 'pdf', 5200000, '/Downloads/Manual.pdf'),
  ]);

  // Root folder with all top-level folders
  const root: FolderItem = createFolder('Root', '/', [
    documents,
    pictures,
    music,
    videos,
    downloads,
  ]);

  return root;
};

export const mockFileSystem = createMockFileSystem();