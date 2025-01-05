import Header from './header/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen w-screen min-w-[320px] max-w-[1920px] mx-auto my-0">
      <Header />
      <main>{children}</main>
    </div>
  );
}
