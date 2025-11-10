export default function Loading() {
  // Return a simple div to ensure Next.js finds a valid component for the loading state
  return (
    <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <h1>Loading...</h1>
    </div>
  );
}
