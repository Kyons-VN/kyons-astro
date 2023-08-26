type Props = {
  l: any;
};

export default function Footer({ l }: Props) {
  return (
    <div class='md:h-[171px] w-full bg-blueGrey-800 flex flex-col text-blueGrey-200 bg-footer p-6 z-10'>
      <div class='w-full md:h-[124px]'>
        <div class='flex flex-col md:flex-row justify-between items-start gap-6 w-full'>
          <div class='w-[126px] hidden md:block'></div>
          <div class='flex flex-col gap-2 w-auto md:w-[544px]'>
            <div class='flex flex-row gap-2'>
              <i class='icon-Location'></i>
              <span>
                <strong>{l.footer.company}</strong>
                <br />
                <span>{l.footer.address}</span>
              </span>
            </div>
            <div class='flex flex-row gap-2'>
              <i class='icon-Phone'></i>
              <span>{l.footer.phone}</span>
            </div>
          </div>
          <div class='flex flex-row gap-2 md:w-[214px]'>
            <i class='icon-linkedin'></i>
            <a class='flex' href='https://www.facebook.com/groups/605349140894461' title='Kyons Community'>
              <i class='icon-facebook'></i>
            </a>
            <i class='icon-youtube'></i>
            <i class='icon-zalo'></i>
          </div>
        </div>
      </div>
      <div class='w-full md:h-[1247px] md:px-6 md:p-0 flex flex-col md:flex-row pt-6'>
        <div class='flex flex-col md:flex-row justify-between items-start gap-6 w-full'>
          <div class='w-[126px] hidden md:block'></div>
          <div class='flex flex-col gap-2 w-auto md:w-[544px] pt-6 md:py-4'>{l.footer.copy}</div>
          <div class='hidden md:flex md:w-[214px]'></div>
        </div>
      </div>
    </div>
  );
}
