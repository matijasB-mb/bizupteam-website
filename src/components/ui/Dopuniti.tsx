/**
 * Označava podatak koji klijent tek mora potvrditi.
 *
 * Namjerno upadljivo. Placeholder koji se stopi s tekstom je placeholder koji
 * ode u produkciju — ovaj se ne može previdjeti ni letimičnim pogledom.
 */
export default function Dopuniti({ children }: { children: React.ReactNode }) {
  return (
    <mark className="bg-[var(--red-wash)] px-1.5 py-0.5 font-medium text-[var(--red-on-light)]">
      {children}
    </mark>
  );
}
